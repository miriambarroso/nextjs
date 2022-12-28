import { useEffect, useState } from 'react';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import CardPerfil from '@/components/atoms/CardPerfil';
import { IEmpresa } from '@/interfaces/empresa';
import { cnpjMask, numberMask, phoneMask } from '@/utils/masks';

type Props = {
  empresa: IEmpresa;
};

const CardPerfilEmpresa = ({ empresa }: Props) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>(
    [
      'Razão Social',
      'Nome Fantasia',
      'CNPJ',
      'Ramo de Atividade',
      'Número de Funcionários',
      'Descrição da Empresa',
      'Telefone Comercial',
      'E-mail Comercial',
      'Site',
    ].map((label) => ({ label, value: null })),
  );

  useEffect(() => {
    if (empresa) {
      setItems([
        {
          label: 'Razão Social',
          value: empresa.razao_social,
        },
        {
          label: 'Nome Fantasia',
          value: empresa.nome_fantasia,
        },
        {
          label: 'CNPJ',
          value: cnpjMask.mask(empresa.cnpj),
        },
        {
          label: 'Ramo de Atividade',
          value: empresa.ramo_atividade,
        },
        {
          label: 'Número de Funcionários',
          value: empresa.numero_funcionarios
            ? numberMask.mask(empresa.numero_funcionarios.toString()) +
              ' funcionários'
            : '',
        },
        {
          label: 'Descrição da Empresa',
          value: empresa.descricao,
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
    <CardPerfil
      title={'Dados da Empresa'}
      button={{
        label: 'Editar dados da empresa',
        href: `/empresa/${empresa?.id}/editar`,
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

export default CardPerfilEmpresa;
