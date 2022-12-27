import { ICursoEspecializacao } from '@/interfaces/cursoEspecializacao';
import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { CardPerfil } from '@/pages/candidato/perfil';

type Props = {
  curso_especializacao: ICursoEspecializacao[];
};

const CardPerfilCursoEspecializacao = ({ curso_especializacao }: Props) => {
  const [items, setItems] = useState<ICursoEspecializacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (curso_especializacao) {
      setItems(curso_especializacao);
      setLoading(false);
    }
  }, [curso_especializacao]);

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
      <div key={index}>
        <p className="font-noto-sans text-sm text-secondary/60 ">
          {item.curso}
        </p>
        <p>{item.instituicao}</p>
        <p>
          {item.data_conclusao} - {item.duracao_horas}H
        </p>
      </div>
    ));

  return (
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
  );
};

export default CardPerfilCursoEspecializacao;
