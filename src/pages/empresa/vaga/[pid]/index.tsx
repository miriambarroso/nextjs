import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IEmpresa } from '@/interfaces/empresa';
import EmpresaService from '@/services/EmpresaService';
import CardEmpresa from '@/components/empresa/CardEmpresa';
import VagaService from '@/services/VagaService';
import { IVaga } from '@/interfaces/vaga';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import { useAuthStore } from '@/store/auth';
import PaginationService from '@/services/PaginationService';
import { toastError, toastSuccess } from '@/utils/toasts';
import CandidaturaService from '@/services/CandidaturaService';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { ICandidato, ICandidatoPerfil } from '@/interfaces/candidato';
import CardDetailCandidato from '@/components/candidato/CardDetailCandidato';
import CandidatoService from '@/services/CandidatoService';

export default function Page() {
  const [vaga, setVaga] = useState<IVaga>(null);
  const [candidatos, setCandidatos] = useState<ICandidatoPerfil[]>(null);
  const [candidatosPagination, setCandidatosPagination] =
    useState<PaginationService<ICandidatoPerfil>>(null);
  const [selectedCandidato, setSelectedCandidato] =
    useState<ICandidatoPerfil>(null);
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
      if (!candidatosPagination.hasNext()) return;

      const paginationData = await candidatosPagination.fetchNext();
      setCandidatosPagination(paginationData);
      setCandidatos((v) => [...v, ...paginationData.results]);
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

  const fetchVaga = async (vagaID: number) => {
    const data = await VagaService.get(vagaID);
    setVaga(data);
  };

  const fetchVagas = async (vagaID: number) => {
    const data = await CandidatoService.getByVaga(vagaID);

    console.log(data);

    setCandidatosPagination(new PaginationService<ICandidatoPerfil>(data));
    setCandidatos(data.results);
  };

  useEffect(() => {
    if (pid) {
      fetchVaga(pid);
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
                <CardDetailVaga
                  vaga={vaga}
                  isOwner={userEmpresa?.id == vaga?.empresa.id}
                />

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
                Lista de candidatos (
                <TextSkeleton as="span" className="h-4 w-[180px] bg-base-100">
                  {candidatosPagination?.count}
                </TextSkeleton>{' '}
                candidatos)
              </span>
            </div>
            <div className="w-full ">
              <div className="flex flex-col lg:grid lg:grid-cols-1 p-0 lg:p-4 rounded lg:bg-white gap-4">
                {candidatos ? (
                  candidatos?.length > 0 ? (
                    candidatos?.map((candidato) => (
                      <CardDetailCandidato
                        key={candidato.id}
                        candidato={candidato}
                        onAction={() => {
                          setSelectedCandidato(candidato);
                        }}
                        onClick={() => handleCandidate(candidato.id)}
                        selected={candidato.id === selectedCandidato?.id}
                        isExpandable={true}
                        isFeature={false}
                        canCandidate={true}
                        isCandidated={candidaturas?.some(
                          (i) => i.vaga == candidato.id,
                        )}
                      />
                    ))
                  ) : (
                    <div className="py-8">
                      <p className="text-center">
                        Não foram encontrados candidatos à esta vaga
                      </p>
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
            {selectedCandidato ? (
              <CardDetailCandidato
                candidato={selectedCandidato}
                onClick={() => handleCandidate(selectedCandidato.id)}
                canCandidate={true}
                isDetail={true}
                isCandidated={candidaturas?.some(
                  (i) => i.vaga == selectedCandidato.id,
                )}
              />
            ) : (
              <div className="card rounded w-full bg-white shadow h-48">
                <div className="card-body items-center justify-center">
                  <h2 className="text-center font-noto-sans">
                    Selecione um candidato para detalhar
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
