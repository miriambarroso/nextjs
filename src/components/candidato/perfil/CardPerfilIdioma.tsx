import { IIdioma } from '@/interfaces/idioma';
import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { IdiomaNivelChoices } from '@/utils/choices';
import CardPerfil from '@/components/atoms/CardPerfil';
import Link from 'next/link';
import useModal from '@/hooks/useModal';
import ConfirmModal from '@/components/atoms/ConfirmModal';
import { toastError, toastSuccess } from '@/utils/toasts';
import IdiomaService from '@/services/IdiomaService';

type Props = { idioma: IIdioma[] };

const CardPerfilIdioma = ({ idioma }: Props) => {
  const [items, setItems] = useState<IIdioma[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState<number>(null);
  const { open, toggle } = useModal();

  useEffect(() => {
    if (idioma) {
      setItems(idioma);
      setLoading(false);
    }
  }, [idioma]);

  const deleteItem = async (id: number) => {
    try {
      await IdiomaService.delete(id);
      toastSuccess('Idioma excluído!');
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      toastError('Erro ao excluir idioma!');
    }
  };

  const renderLoading = () => (
    <div className={'flex flex-col gap-y-2 '}>
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
    </div>
  );

  const renderNoItems = () => <p>Não há idiomas cadastrados</p>;

  const renderItems = () =>
    items.map((item, index) => (
      <div key={index} className="flex items-center">
        <div>
          <p className="font-noto-sans capitalize">
            {item.nome} - {IdiomaNivelChoices.findByIntValue(item.nivel)?.label}
          </p>
        </div>
        <div className={'ml-auto  flex flex-col text-right gap-2'}>
          <Link
            href={`/candidato/idioma/${item.id}/editar`}
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
        title={'Idioma'}
        button={{
          label: 'Adicionar idioma',
          href: '/candidato/idioma/cadastrar',
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
      <ConfirmModal
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
export default CardPerfilIdioma;
