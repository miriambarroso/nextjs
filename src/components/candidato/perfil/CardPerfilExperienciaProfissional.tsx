import { IExperienciaProfissional } from '@/interfaces/experienciaProfissional';
import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { CardPerfil } from '@/pages/candidato/perfil';
import { formatDateToLocale } from '@/utils/date';
import Link from 'next/link';
import useModal from '@/hooks/useModal';
import CandidatoModal from '@/components/candidato/CandidatoModal';
import { toastError, toastSuccess } from '@/utils/toasts';
import ExperienciaProfissionalService from '@/services/ExperienciaProfissionalService';

type Props = {
  experiencia_profissional: IExperienciaProfissional[];
};

const CardPerfilExperienciaProfissional = ({
  experiencia_profissional,
}: Props) => {
  const [items, setItems] = useState<IExperienciaProfissional[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState<number>(null);
  const { open, toggle } = useModal();

  useEffect(() => {
    if (experiencia_profissional) {
      setItems(experiencia_profissional);
      setLoading(false);
    }
  }, [experiencia_profissional]);

  const deleteItem = async (id: number) => {
    try {
      await ExperienciaProfissionalService.delete(id);
      toastSuccess('Experiência profissional excluída!');
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      toastError('Erro ao excluir experiência profissional!');
    }
  };

  const renderLoading = () => (
    <div className={'flex flex-col gap-y-2 '}>
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
    </div>
  );
  const renderNoItems = () => (
    <p>Não há experiências profissionais cadastradas</p>
  );
  const renderItems = () =>
    items.map((item, index) => (
      <div key={index} className="flex items-center">
        <div>
          <p className="font-noto-sans ">
            {item.cargo}, {item.empresa}
          </p>
          <p className="text-sm text-secondary/60 uppercase">
            {formatDateToLocale(item.data_inicio)} -{' '}
            {item.data_fim ? formatDateToLocale(item.data_fim) : 'atual'}
          </p>
          <p>{item.atividades}</p>
        </div>
        <div className={'ml-auto  flex flex-col text-right gap-2'}>
          <Link
            href={`/candidato/experiencia-profissional/${item.id}/editar`}
            className="link link-hover link-neutral text-sm"
          >
            Editar
          </Link>
          <button
            onClick={() => {
              setItemId(item.id);
              toggle();
            }}
            className={'link link-hover link-error text-sm '}
          >
            Excluir
          </button>
        </div>
      </div>
    ));

  return (
    <>
      <CardPerfil
        title={'Experiência Profissional'}
        button={{
          label: 'Adicionar experiência profissional',
          href: '/candidato/experiencia-profissional/cadastrar',
        }}
      >
        <div className={'space-y-2 mt-4 divide-y divide-gray-100'}>
          {loading
            ? renderLoading()
            : items.length > 0
            ? renderItems()
            : renderNoItems()}
        </div>
      </CardPerfil>
      <CandidatoModal
        open={open}
        close={toggle}
        confirm={() => {
          toggle();
          deleteItem(itemId);
        }}
        title={'Excluir experiência profissional'}
        message={'Deseja realmente excluir esta experiência profissional?'}
      />
    </>
  );
};

export default CardPerfilExperienciaProfissional;
