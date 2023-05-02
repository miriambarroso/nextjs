import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IEmpresa } from '@/interfaces/empresa';
import EmpresaService from '@/services/EmpresaService';
import CardEmpresa from '@/components/empresa/CardEmpresa';
import VagaService from '@/services/VagaService';
import { IVaga } from '@/interfaces/vaga';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import { EMPREGADOR, useAuthStore } from '@/store/auth';
import PaginationService from '@/services/PaginationService';
import { toastError, toastSuccess } from '@/utils/toasts';
import CandidaturaService from '@/services/CandidaturaService';
import TextSkeleton from '@/components/skeleton/TextSkeleton';

export default function Page() {
  const [empresa, setEmpresa] = useState<IEmpresa>(null);
  const [vagas, setVagas] = useState<IVaga[]>(null);
  const [vagasPagination, setVagasPagination] =
    useState<PaginationService<IVaga>>(null);
  const [selectedVaga, setSelectedVaga] = useState<IVaga>(null);
  const scrollDetail = useRef<HTMLDivElement>(null);

  const [user, candidaturas, setCandidaturas, isCandidato, userEmpresa] =
    useAuthStore((state) => [
      state.user,
      state.candidaturas,
      state.setCandidaturas,
      state.isCandidato,
      state.empresa,
    ]);

  // useEffect(() => {
  //   scrollDetail.current.scrollTo(0, 0);
  // }, [selectedVaga]);

  const handleVagasNextPage = async () => {
    try {
      if (!vagasPagination.hasNext()) return;

      const paginationData = await vagasPagination.fetchNext();
      setVagasPagination(paginationData);
      setVagas((v) => [...v, ...paginationData.results]);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  const handleCandidate = async (id: number) => {
    try {
      const item = candidaturas.findIndex((i) => i.vaga == id);

      if (item > -1) {
        await CandidaturaService.delete(candidaturas[item].id);
        toastSuccess('Candidatura cancelada!');
        let newCandidaturas = candidaturas;
        newCandidaturas.splice(item, 1);
        setCandidaturas([...newCandidaturas]);
      } else {
        const data = await CandidaturaService.create({
          vaga: id,
          usuario: user?.id,
        });
        toastSuccess('Candidatura realizada!');
        setCandidaturas([...candidaturas, data]);
      }
    } catch (error) {
      toastError('Erro ao realizar candidatura!');
    }
  };

  const router = useRouter();
  const pid = router.query.pid as unknown as number;

  const fetchEmpresa = async (empresaID: number) => {
    const data = await EmpresaService.get(empresaID);
    setEmpresa(data);
  };

  const fetchVagas = async (empresaID: number) => {
    const data = await VagaService.getVagasEmpresa(empresaID);

    setVagasPagination(new PaginationService<IVaga>(data));
    setVagas(data.results);
  };

  useEffect(() => {
    if (pid) {
      fetchEmpresa(pid);
      fetchVagas(pid);
    }
  }, [pid]);

  return (
    <div className="mb-8 mt-4 space-y-2">
      <div className="lg:flex gap-8">
        <div className="lg:w-4/12 space-y-4">
          <div>
            <div className="label">
              <span className="label-text">Informações sobre a empresa</span>
            </div>
            <div className="w-full ">
              <div className="flex flex-col lg:grid lg:grid-cols-1 p-0 lg:p-4 rounded lg:bg-white gap-4">
                <CardEmpresa empresa={empresa} />

                {/*<InfiniteScroller callback={handleVagasNextPage}>*/}
                {/*  <div className="flex items-center justify-center">*/}
                {/*    <BiLoaderCircle className="text-3xl animate-spin" />*/}
                {/*  </div>*/}
                {/*</InfiniteScroller>*/}
              </div>
            </div>
          </div>
          <div>
            <div className="label">
              <span className="label-text">
                Lista de vagas (
                <TextSkeleton as="span" className="h-4 w-[180px] bg-base-100">
                  {vagasPagination?.count}
                </TextSkeleton>{' '}
                vagas)
              </span>
            </div>
            <div className="w-full ">
              <div className="flex flex-col lg:grid lg:grid-cols-1 p-0 lg:p-4 rounded lg:bg-white gap-4">
                {vagas ? (
                  vagas?.length > 0 ? (
                    vagas?.map((vaga) => (
                      <CardDetailVaga
                        key={vaga.id}
                        vaga={vaga}
                        isOwner={userEmpresa?.id == vaga.empresa.id}
                        onAction={() => {
                          setSelectedVaga(vaga);
                        }}
                        onClick={() => handleCandidate(vaga.id)}
                        selected={vaga.id === selectedVaga?.id}
                        isExpandable={true}
                        isFeature={false}
                        canCandidate={true}
                        isCandidated={candidaturas?.some(
                          (i) => i.vaga == vaga.id,
                        )}
                      />
                    ))
                  ) : (
                    <div className="py-8">
                      <p className="text-center">Não foram encontradas vagas</p>
                    </div>
                  )
                ) : (
                  <CardDetailVaga
                    vaga={null}
                    isOwner={false}
                    isFeature={false}
                    skeleton={3}
                    className="snap-center"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-8/12 hidden lg:block">
          <div className="label">
            <span className="label-text">Detalhes da vaga selecionada</span>
          </div>
          <div
            className="sticky top-0 lg:max-h-screen lg:overflow-y-auto flex w-full bg-white rounded"
            ref={scrollDetail}
          >
            {selectedVaga ? (
              <CardDetailVaga
                vaga={selectedVaga}
                onClick={() => handleCandidate(selectedVaga.id)}
                canCandidate={true}
                isOwner={userEmpresa?.id == selectedVaga.empresa.id}
                isCandidated={candidaturas?.some(
                  (i) => i.vaga == selectedVaga.id,
                )}
              />
            ) : (
              <div className="card rounded w-full bg-white shadow h-48">
                <div className="card-body items-center justify-center">
                  <h2 className="text-center font-noto-sans">
                    Selecione uma vaga para detalhar
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Page.permissions = [EMPREGADOR];
