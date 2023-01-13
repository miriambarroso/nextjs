import { ADMIN, CANDIDATO, SUPERADMIN, useAuthStore } from '@/store/auth';
import { Fragment, useEffect, useRef, useState } from 'react';
import { toastError, toastSuccess } from '@/utils/toasts';
import VagaService from '@/services/VagaService';
import { IVaga } from '@/interfaces/vaga';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import { range } from 'lodash';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import CandidaturaService from '@/services/CandidaturaService';

type Props = {};

const Page = ({}: Props) => {
  const [vagas, setVagas] = useState<IVaga[]>(null);
  const [user, candidaturas, setCandidaturas] = useAuthStore((state) => [
    state.user,
    state.candidaturas,
    state.setCandidaturas,
  ]);
  const [selectedVaga, setSelectedVaga] = useState<IVaga>(null);
  const [countVagas, setCountVagas] = useState(0);
  const scrollDetail = useRef<HTMLDivElement>(null);

  const fetchVagas = async () => {
    try {
      const { results, count } = await VagaService.getVagasCandidaturas(
        user?.id,
      );
      const firstVaga = results.length > 0 ? results[0] : null;
      setSelectedVaga(firstVaga);
      setVagas(results);
      setCountVagas(count);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  useEffect(() => {
    if (user) {
      fetchVagas();
    }
  }, [user]);

  useEffect(() => {
    scrollDetail.current?.scrollTo(0, 0);
  }, [selectedVaga]);

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

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 mb-8 mt-4">
        <div className="lg:w-4/12">
          <div className="label">
            <span className="label-text inline-flex items-center">
              Candidaturas ativas (
              <TextSkeleton as={'span'} className="h-4 w-8 bg-base-200 mr-2">
                {countVagas}
              </TextSkeleton>{' '}
              candidaturas)
            </span>
          </div>
          <div className="w-full">
            <div className="overflow-x-auto flex lg:grid lg:grid-cols-1 snap-x snap-mandatory bg-white p-4 rounded">
              {vagas ? (
                vagas.length ? (
                  vagas?.map((vaga, index) => (
                    <Fragment key={index}>
                      <CardDetailVaga
                        vaga={vaga}
                        isOwner={false}
                        onAction={() => setSelectedVaga(vaga)}
                        onClick={() => handleCandidate(vaga.id)}
                        selected={vaga.id === selectedVaga?.id}
                        isFeature={true}
                        className="snap-center"
                        canCandidate={true}
                        isCandidated={candidaturas?.some(
                          (i) => i.vaga == vaga.id,
                        )}
                      />
                      {index !== vagas?.length - 1 && (
                        <div className="divider m-1"></div>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <div className="py-8">
                    <p className="text-center">Não há candidaturas ativas</p>
                  </div>
                )
              ) : (
                range(3).map((index) => (
                  <>
                    <CardDetailVaga
                      key={index}
                      vaga={null}
                      skeleton={1}
                      className="snap-center"
                    />
                    {index !== vagas?.length - 1 && (
                      <div className="divider m-1"></div>
                    )}
                  </>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-8/12">
          <div className="label">
            <span className="label-text">Detalhes da vaga selecionada</span>
          </div>
          <div
            className="sticky top-0 max-h-screen overflow-y-auto flex w-full bg-white rounded"
            ref={scrollDetail}
          >
            {selectedVaga ? (
              <CardDetailVaga
                vaga={selectedVaga}
                isOwner={false}
                canCandidate={true}
                onClick={() => handleCandidate(selectedVaga.id)}
                isCandidated={candidaturas?.some(
                  (i) => i.vaga == selectedVaga.id,
                )}
              />
            ) : (
              <div className="card rounded w-full bg-white h-48">
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
    </>
  );
};

Page.permissions = [SUPERADMIN, ADMIN, CANDIDATO];

export default Page;
