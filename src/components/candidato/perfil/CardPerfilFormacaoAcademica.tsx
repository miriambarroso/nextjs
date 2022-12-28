import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';
import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { FormacaoNivelChoices } from '@/utils/choices';
import CardPerfil from '@/components/atoms/CardPerfil';
import { formatDateToLocale } from '@/utils/date';
import Link from 'next/link';
import CandidatoModal from '@/components/candidato/CandidatoModal';
import useModal from '@/hooks/useModal';
import FormacaoAcademicaService from '@/services/FormacaoAcademicaService';
import { toastError, toastSuccess } from '@/utils/toasts';

type Props = {
  formacao_academica: IFormacaoAcademica[];
};

const CardPerfilFormacaoAcademica = ({ formacao_academica }: Props) => {
  const [items, setItems] = useState<IFormacaoAcademica[]>([]);
  const [loading, setLoading] = useState(true);
  const { open, toggle } = useModal();
  const [itemId, setItemId] = useState<number>(null);

  useEffect(() => {
    if (formacao_academica) {
      setItems(formacao_academica);
      setLoading(false);
    }
  }, [formacao_academica]);

  const deleteItem = async (id: number) => {
    try {
      await FormacaoAcademicaService.delete(id);
      toastSuccess('Formação acadêmica excluída!');
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      toastError('Erro ao excluir formação acadêmica!');
    }
  };

  const renderLoading = () => (
    <div className={'flex flex-col gap-y-2 '}>
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
    </div>
  );
  const renderNoItems = () => <p>Não há formações academicas cadastradas</p>;

  const renderItems = () =>
    items.map((item, index) => (
      <div key={index} className="flex items-center">
        <div>
          <p className="font-noto-sans">
            {FormacaoNivelChoices.findByIntValue(item.nivel)?.label},{' '}
            {item.curso}
          </p>
          <p>{item.instituicao}</p>
          <p className="text-sm uppercase text-secondary/60 ">
            {formatDateToLocale(item.data_inicio)} -{' '}
            {item.data_conclusao
              ? formatDateToLocale(item.data_conclusao)
              : 'Atual'}
          </p>
        </div>
        <div className={'ml-auto  flex flex-col text-right gap-2'}>
          <Link
            href={`/candidato/formacao-academica/${item.id}/editar`}
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
        title={'Formação Acadêmica'}
        button={{
          label: 'Adicionar formação acadêmica',
          href: '/candidato/formacao-academica/cadastrar',
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
        title={'Excluir formação acadêmica'}
        message={'Deseja realmente excluir esta formação acadêmica?'}
      />
    </>
  );
};

export default CardPerfilFormacaoAcademica;
