import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import CardPerfil from '@/components/atoms/CardPerfil';
import { IEndereco } from '@/interfaces/endereco';
import { cepMask } from '@/utils/masks';

type Props = {
  endereco: IEndereco;
};

const CardPerfilContatosEndereco = ({ endereco }: Props) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>(
    [
      'CEP',
      'Logradouro',
      'Número',
      'Complemento',
      'Bairro',
      'Cidade',
      'Estado',
    ].map((label) => ({ label, value: null })),
  );

  useEffect(() => {
    if (endereco) {
      setItems([
        {
          label: 'CEP',
          value: endereco.cep ? cepMask.mask(endereco.cep) : '-',
        },
        {
          label: 'Logradouro',
          value: endereco.logradouro ?? '-',
        },
        {
          label: 'Número',
          value: endereco.numero ?? '-',
        },
        {
          label: 'Complemento',
          value: endereco.complemento ?? '-',
        },
        {
          label: 'Bairro',
          value: endereco.bairro ?? '-',
        },
        {
          label: 'Cidade',
          value: endereco.cidade ?? '-',
        },
        {
          label: 'Estado',
          value: endereco.estado ?? '-',
        },
      ]);
    }
  }, [endereco]);

  return (
    <CardPerfil
      title={'Endereço'}
      button={{
        label: 'Editar endereço',
        href: `/candidato/endereco/${endereco?.id}/editar`,
      }}
    >
      <div className={'space-y-2 mt-4'}>
        {items.map((i, index) => {
          return (
            <div key={index}>
              <p className="font-noto-sans text-sm text-secondary/60 ">
                {i.label}
              </p>
              <TextSkeleton className="h-4 w-[180px] bg-base-100">
                {i.value}
              </TextSkeleton>
            </div>
          );
        })}
      </div>
    </CardPerfil>
  );
};

export default CardPerfilContatosEndereco;
