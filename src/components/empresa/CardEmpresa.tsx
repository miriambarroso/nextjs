import { IEmpresa } from '@/interfaces/empresa';
import { useEffect, useState } from 'react';
import { cnpjMask, numberMask, phoneMask } from '@/utils/masks';
import TextSkeleton from '@/components/skeleton/TextSkeleton';

type Props = {
  empresa: IEmpresa;
};

const CardEmpresa = ({ empresa }: Props) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>(
    [
      'Nome Fantasia',
      'CNPJ',
      'Telefone Comercial',
      'E-mail Comercial',
      'Site',
    ].map((label) => ({ label, value: null })),
  );

  useEffect(() => {
    if (empresa) {
      setItems([
        {
          label: 'Nome Fantasia',
          value: empresa.nome_fantasia,
        },
        {
          label: 'CNPJ',
          value: cnpjMask.mask(empresa.cnpj),
        },
        {
          label: 'Telefone Comercial',
          value: empresa.telefone ? phoneMask.mask(empresa.telefone) : '-',
        },
        {
          label: 'E-mail Comercial',
          value: empresa.email,
        },
        {
          label: 'Site',
          value: empresa.site ?? '-',
        },
      ]);
    }
  }, [empresa]);

  return (
    <>
      <div className="card rounded w-full bg-white">
        <div className={'space-y-2'}>
          {items.map((i, index) => {
            return (
              <div key={index}>
                <p className="font-noto-sans text-sm text-fade ">{i.label}</p>
                <TextSkeleton className="h-4 w-[180px] bg-base-100">
                  {i.value}
                </TextSkeleton>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CardEmpresa;
