import GenericSection from '@/components/atoms/GenericSection';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { IVaga } from '@/interfaces/vaga';
import VagaService from '@/services/VagaService';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';

type Props = {};

const OportunidadesDestaqueSection = ({}: Props) => {
  const [vagas, setVagas] = useState<IVaga[]>(null);
  useEffect(() => {
    VagaService.getAll({ limit: 3 }).then(({ results }) => {
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
                <CardDetailVaga
                  key={index}
                  vaga={vaga}
                  isOwner={false}
                  onClick={() => {
                    return Router.push(`/vagas?selecionado=${vaga.id}`);
                  }}
                  isFeature={true}
                  className="hover:bg-base-100 snap-center p-0"
                />
              ))
            ) : (
              <CardDetailVaga
                vaga={null}
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
