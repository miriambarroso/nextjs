import { ADMIN, EMPREGADOR, SUPERADMIN, useAuthStore } from '@/store/auth';
import { Fragment, useEffect, useRef, useState } from 'react';
import { toastError, toastSuccess } from '@/utils/toasts';
import VagaService from '@/services/VagaService';
import { IVaga } from '@/interfaces/vaga';
import { range } from 'lodash';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import useOnUser from '@/hooks/useOnUser';

type Props = {};

const Page = ({}: Props) => {
  const [vagas, setVagas] = useState<IVaga[]>(null);
  const [empresa] = useAuthStore((state) => [state.empresa]);
  const [selectedVaga, setSelectedVaga] = useState<IVaga>(null);
  const [countVagas, setCountVagas] = useState(0);
  const scrollDetail = useRef<HTMLDivElement>(null);

  const fetchVagas = async () => {
    try {
      const { results, count } = await VagaService.getVagasEmpresa(empresa?.id);
      const firstVaga = results.length > 0 ? results[0] : null;
      setSelectedVaga(firstVaga);
      setVagas(results);
      setCountVagas(count);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  useOnUser(() => {
    if (empresa) {
      fetchVagas();
    }
  }, [empresa]);

  useEffect(() => {
    scrollDetail.current?.scrollTo(0, 0);
  }, [selectedVaga]);

  const deleteItem = async (id: number) => {
    try {
      await VagaService.delete(id);
      toastSuccess('Vaga excluída!');
      setVagas(vagas.filter((item) => item.id !== id));
    } catch (error) {
      toastError('Erro ao excluir vaga!');
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 mb-8 mt-4">
        <div className="lg:w-4/12">
          <div className="label">
            <span className="label-text inline-flex items-center">
              Vagas cadastradas (
              <TextSkeleton as={'span'} className="h-4 w-8 bg-base-200 mr-2">
                {countVagas}
              </TextSkeleton>{' '}
              vagas)
            </span>
          </div>
          <div className="w-full">
            <div className="overflow-x-auto flex lg:grid lg:grid-cols-1 snap-x snap-mandatory bg-white p-4 rounded">
              {vagas ? (
                vagas.length > 0 ? (
                  vagas?.map((vaga, index) => (
                    <Fragment key={index}>
                      <CardDetailVaga
                        vaga={vaga}
                        isOwner={true}
                        onAction={() => setSelectedVaga(vaga)}
                        selected={vaga.id === selectedVaga?.id}
                        isFeature={true}
                        className="snap-center"
                        canCandidate={true}
                      />
                      {index !== vagas?.length - 1 && (
                        <div className="divider m-1"></div>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <div className="py-8">
                    <p className="text-center">Não foram encontradas vagas</p>
                  </div>
                )
              ) : (
                range(3).map((index) => (
                  <>
                    <CardDetailVaga
                      key={index}
                      vaga={null}
                      isOwner={true}
                      selected={false}
                      isFeature={true}
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
                isOwner={true}
                onDelete={() => deleteItem(selectedVaga.id)}
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

Page.permissions = [SUPERADMIN, ADMIN, EMPREGADOR];

export default Page;
