import { IIdioma } from '@/interfaces/idioma';
import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { IdiomaNivelChoices } from '@/utils/choices';
import { CardPerfil } from '@/pages/candidato/perfil';

type Props = { idioma: IIdioma[] };

const CardPerfilIdioma = ({ idioma }: Props) => {
  const [items, setItems] = useState<IIdioma[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idioma) {
      setItems(idioma);
      setLoading(false);
    }
  }, [idioma]);

  const renderLoading = () => (
    <div className={'flex flex-col gap-y-2 '}>
      <TextSkeleton className="h-4 w-1/2 bg-base-100" />
    </div>
  );

  const renderNoItems = () => <p>Não há idiomas cadastrados</p>;

  const renderItems = () =>
    items.map((item, index) => (
      <div key={index}>
        <p className="font-noto-sans text-sm text-secondary/60 ">
          {item.nome} - {IdiomaNivelChoices.findByIntValue(item.nivel)?.label}
        </p>
      </div>
    ));

  return (
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
  );
};
export default CardPerfilIdioma;
