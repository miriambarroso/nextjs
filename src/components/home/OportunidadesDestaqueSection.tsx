import GenericSection from '@/components/atoms/GenericSection';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { IVaga } from '@/interfaces/vaga';
import VagaService from '@/services/VagaService';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import { useAuthStore } from '@/store/auth';

type Props = {};

const OportunidadesDestaqueSection = ({}: Props) => {
  const [empresa] = useAuthStore((state) => [state.empresa]);
  const [vagas, setVagas] = useState<IVaga[]>(null);
  useEffect(() => {
    VagaService.getAll({ page_size: 3 }).then(({ results }) => {
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
          <div className="overflow-x-auto flex snap-x snap-mandatory lg:gap-4 bg-white py-4 rounded">
            {vagas ? (
              vagas?.map((vaga, index) => (
                <CardDetailVaga
                  key={index}
                  vaga={vaga}
                  isOwner={empresa?.id === vaga.empresa.id}
                  onClick={() => {
                    return Router.push(`/vagas?selecionado=${vaga.id}`);
                  }}
                  isFeature={true}
                  canCandidate={true}
                  className="hover:bg-base-100 snap-center p-0"
                />
              ))
            ) : (
              <CardDetailVaga
                vaga={null}
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
