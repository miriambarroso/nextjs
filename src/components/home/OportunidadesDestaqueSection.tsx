import GenericSection from '@/components/atoms/GenericSection';
import CardVaga from '@/components/vaga/CardVaga';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { IVaga } from '@/interfaces/vaga';
import VagaService from '@/services/VagaService';

type Props = {};

const OportunidadesDestaqueSection = ({}: Props) => {
  const [vagas, setVagas] = useState<IVaga[]>(null);
  useEffect(() => {
    VagaService.getAll().then(({ results }) => {
      setVagas(results);
    });
  }, []);

  return (
    <>
      <GenericSection
        title={'Oportunidades em destaque'}
        action={{
          href: '/vagas',
          label: 'Veja mais oportunidades',
        }}
      >
        <div className="w-full">
          <div className="overflow-x-auto flex lg:grid lg:grid-cols-3 snap-x snap-mandatory lg:gap-4 bg-white py-4 rounded">
            {vagas ? (
              vagas?.map((vaga, index) => (
                <CardVaga
                  key={index}
                  vaga={vaga}
                  isCandidato={true}
                  isOwner={false}
                  onClick={() => {
                    return Router.push(`/vagas/${vaga.id}`);
                  }}
                  className="lg:hover:bg-base-100 snap-center p-0"
                />
              ))
            ) : (
              <CardVaga
                vaga={null}
                isCandidato={true}
                isOwner={false}
                className="snap-center p-0 cursor-default"
                skeleton={3}
              />
            )}
          </div>
        </div>
      </GenericSection>
    </>
  );
};

export default OportunidadesDestaqueSection;
