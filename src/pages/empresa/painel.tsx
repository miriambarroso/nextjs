import { ADMIN, EMPREGADOR, SUPERADMIN } from '@/store/auth';
import CardVaga from '@/components/vaga/CardVaga';
import { Fragment, useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/utils/toasts';
import VagaService from '@/services/VagaService';
import { IVaga } from '@/interfaces/vaga';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import { range } from 'lodash';
import TextSkeleton from '@/components/skeleton/TextSkeleton';

type Props = {};

const Page = ({}: Props) => {
  const [vagas, setVagas] = useState<IVaga[]>(null);
  const [selectedVaga, setSelectedVaga] = useState<IVaga>(null);

  const fetchVagas = async () => {
    try {
      const { results } = await VagaService.getAll();
      const firstVaga = results.length > 0 ? results[0] : null;
      setSelectedVaga(firstVaga);
      setVagas(results);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

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
      <div className="flex gap-8">
        <div className="w-4/12">
          <div className="label">
            <span className="label-text inline-flex items-center">
              Vagas cadastradas (
              <TextSkeleton as={'span'} className="h-4 w-8 bg-base-200 mr-2">
                {vagas?.length}
              </TextSkeleton>{' '}
              vagas)
            </span>
          </div>
          <div className="w-full grid grid-cols-1 bg-white p-4 rounded">
            {vagas
              ? vagas?.map((vaga, index) => (
                  <Fragment key={index}>
                    <CardVaga
                      vaga={vaga}
                      isCandidato={false}
                      isOwner={true}
                      onClick={() => setSelectedVaga(vaga)}
                      selected={vaga.id === selectedVaga?.id}
                    />
                    {index !== vagas?.length - 1 && (
                      <div className="divider m-1"></div>
                    )}
                  </Fragment>
                ))
              : range(3).map((index) => (
                  <>
                    <CardVaga
                      key={index}
                      vaga={null}
                      isCandidato={false}
                      isOwner={true}
                      selected={false}
                    />
                    {index !== vagas?.length - 1 && (
                      <div className="divider m-1"></div>
                    )}
                  </>
                ))}
          </div>
        </div>
        <div className="w-8/12 sticky">
          <div className="sticky top-0">
            <div className="label">
              <span className="label-text">Detalhes da vaga selecionada</span>
            </div>
            <div className="w-full grid grid-cols-1 gap-4  ">
              {selectedVaga ? (
                <CardDetailVaga
                  vaga={selectedVaga}
                  isCandidato={false}
                  isOwner={true}
                  onDelete={() => deleteItem(selectedVaga.id)}
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
    </>
  );
};

Page.permissions = [SUPERADMIN, ADMIN, EMPREGADOR];

export default Page;
