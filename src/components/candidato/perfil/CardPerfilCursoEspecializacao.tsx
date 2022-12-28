import { ICursoEspecializacao } from '@/interfaces/cursoEspecializacao';
import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import CardPerfil from '@/components/atoms/CardPerfil';
import { formatDateToLocale } from '@/utils/date';
import Link from 'next/link';
import useModal from '@/hooks/useModal';
import { toastError, toastSuccess } from '@/utils/toasts';
import CursoEspecializacaoService from '@/services/CursoEspecializacaoService';
import CandidatoModal from '@/components/candidato/CandidatoModal';

type Props = {
  curso_especializacao: ICursoEspecializacao[];
};

const CardPerfilCursoEspecializacao = ({ curso_especializacao }: Props) => {
  const [items, setItems] = useState<ICursoEspecializacao[]>([]);
  const [loading, setLoading] = useState(true);
  const { open, toggle } = useModal();
  const [itemId, setItemId] = useState<number>(null);

  useEffect(() => {
    if (curso_especializacao) {
      setItems(curso_especializacao);
      setLoading(false);
    }
  }, [curso_especializacao]);

  const deleteItem = async (id: number) => {
    try {
      await CursoEspecializacaoService.delete(id);
      toastSuccess('Curso ou especialização excluída!');
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      toastError('Erro ao excluir curso ou especialização!');
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
    <p>Não há cursos ou especializações cadastradas</p>
  );

  const renderItems = () =>
    items.map((item, index) => (
      <div key={index} className="flex items-center">
        <div>
          <p className="font-noto-sans  ">{item.curso}</p>
          <p>{item.instituicao}</p>
          <p className="text-sm text-secondary/60 uppercase">
            {formatDateToLocale(item.data_conclusao)} - {item.duracao_horas}H
          </p>
        </div>
        <div className={'ml-auto  flex flex-col text-right gap-2'}>
          <Link
            href={`/candidato/curso-especializacao/${item.id}/editar`}
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
        title={'Curso e Especialização'}
        button={{
          label: 'Adicionar curso ou especialição',
          href: '/candidato/curso-especializacao/cadastrar',
        }}
      >
        <div className={'space-y-2 divide-y divide-gray-100'}>
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
        title={'Excluir curso ou especialização'}
        message={'Deseja realmente excluir este curso ou especialização?'}
      />
    </>
  );
};

export default CardPerfilCursoEspecializacao;
