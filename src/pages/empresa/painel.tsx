import { ADMIN, EMPREGADOR, SUPERADMIN } from '@/store/auth';
import CardVaga from '@/components/vaga/CardVaga';
import { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '@/utils/toasts';
import VagaService from '@/services/VagaService';
import { IVaga } from '@/interfaces/vaga';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';

type Props = {};

const Page = ({}: Props) => {
  const [vagas, setVagas] = useState<IVaga[]>([]);
  const [selectedVaga, setSelectedVaga] = useState<IVaga>(null);

  const fetchVagas = async () => {
    try {
      const data = await VagaService.getAll();
      const firstVaga = data.length > 0 ? data[0] : null;
      setSelectedVaga(firstVaga);
      setVagas(data);
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
            <span className="label-text">
              Vagas cadastradas ({vagas.length} vagas)
            </span>
          </div>
          <div className="w-full grid grid-cols-1 bg-white p-4 rounded">
            {vagas.map((vaga, index) => (
              <>
                <CardVaga
                  key={vaga.id}
                  vaga={vaga}
                  isCandidato={false}
                  isOwner={true}
                  onClick={() => setSelectedVaga(vaga)}
                  selected={vaga.id === selectedVaga?.id}
                />
                {index !== vagas.length - 1 && (
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
