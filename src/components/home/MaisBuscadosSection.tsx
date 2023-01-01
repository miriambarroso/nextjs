import GenericSection from '@/components/atoms/GenericSection';
import Link from 'next/link';
import { useState } from 'react';
import { classNames } from '@/utils';

type Props = {};

const MaisBuscadosSection = ({}: Props) => {
  const [tab, setTab] = useState<number>(0);

  const jobs = [
    'Auxiliar Administrativo',
    'Advogado',
    'Recepcionista',
    'Vendedor',
    'Engenheiro Civil',
    'Desenvolvedor',
    'Atendente',
    'Operador de Caixa',
    'Enfermeiro',
  ];

  const salaries = [
    'R$ 1.000,00',
    'R$ 2.000,00',
    'R$ 3.000,00',
    'R$ 4.000,00',
    'R$ 5.000,00',
    'R$ 6.000,00',
    'R$ 7.000,00',
    'R$ 8.000,00',
  ];

  const companies = [
    'Vale',
    'Banco do Brasil',
    'Itaú',
    'Bradesco',
    'Santander',
    'Caixa Econômica Federal',
    'Petrobras',
    'Banco Inter',
    'Banco Original',
    'Banco Neon',
    'Banco Nubank',
  ];

  const tabs = [
    { label: 'Cargo', items: jobs },
    { label: 'Salários', items: salaries },
    { label: 'Empresas', items: companies },
  ];

  return (
    <>
      <GenericSection title={'Buscas populares'}>
        <div className="tabs w-full relative after:z-0 [&>*]:z-20 after:absolute after:w-full after:h-full after:border-b-2 after:border-base-300 after:top-0 after:left-0">
          {tabs.map((item, index) => (
            <button
              onClick={() => setTab(index)}
              key={index}
              className={classNames(
                'tab tab-bordered',
                tab == index ? 'tab-active text-neutral' : 'border-none',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-white px-4 py-4">
          {tabs[tab].items.map((item, index) => (
            <Link
              href={`/vagas/?termo=${item}`}
              key={index}
              className="link link-hover"
            >
              {item}
            </Link>
          ))}
        </div>
      </GenericSection>
    </>
  );
};

export default MaisBuscadosSection;
