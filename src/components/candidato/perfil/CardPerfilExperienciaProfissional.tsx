import { IExperienciaProfissional } from '@/interfaces/experienciaProfissional';
import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { CardPerfil } from '@/pages/candidato/perfil';

type Props = {
  experiencia_profissional: IExperienciaProfissional[];
};

const CardPerfilExperienciaProfissional = ({
  experiencia_profissional,
}: Props) => {
  const [items, setItems] = useState<IExperienciaProfissional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (experiencia_profissional) {
      setItems(experiencia_profissional);
      setLoading(false);
    }
  }, [experiencia_profissional]);

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
      <div key={index}>
        <p className="font-noto-sans text-sm text-secondary/60 ">
          {item.cargo}, {item.empresa}
        </p>
        <p>
          {item.data_inicio} - {item.data_fim}
        </p>
        <p>{item.atividades}</p>
      </div>
    ));

  return (
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
  );
};

export default CardPerfilExperienciaProfissional;
