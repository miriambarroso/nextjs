import GenericSection from '@/components/atoms/GenericSection';
import Link from 'next/link';

type Props = {};

const MaisBuscadosSection = ({}: Props) => {
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

  return (
    <>
      <GenericSection title={'Buscas populares'}>
        <div className="tabs w-full relative after:z-0 [&>*]:z-20 after:absolute after:w-full after:h-full after:border-b-2 after:border-base-300 after:top-0 after:left-0">
          <a className="tab tab-bordered border-none">Cargo</a>
          <a className="tab tab-bordered tab-active text-neutral">Salários</a>
          <a className="tab tab-bordered border-none">Empresas</a>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-white px-4 py-4">
          {jobs.map((job, index) => (
            <Link
              href={`/vagas/?q=${job}`}
              key={index}
              className="link link-hover"
            >
              {job}
            </Link>
          ))}
        </div>
      </GenericSection>
    </>
  );
};

export default MaisBuscadosSection;
