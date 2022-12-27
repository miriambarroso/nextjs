import { IObjetivoProfissional } from '@/interfaces/objetivoProfissional';
import { useEffect, useState } from 'react';
import { currencyMask } from '@/utils/masks';
import {
  JornadaTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { CardPerfil } from '@/pages/candidato/perfil';

type Props = {
  objetivo_profissional: IObjetivoProfissional;
  openModal?: boolean;
  toggleModal?: () => void;
};

const CardPerfilObjetivoProfissional = ({ objetivo_profissional }: Props) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>(
    [
      'Cargo pretendido',
      'Pretensão salarial',
      'Jornada de trabalho',
      'Regime contratual',
    ].map((label) => ({ label, value: null })),
  );

  useEffect(() => {
    if (objetivo_profissional) {
      setItems([
        {
          label: 'Cargo pretendido',
          value: objetivo_profissional.cargo ?? '',
        },
        {
          label: 'Pretensão salarial',
          value: currencyMask.mask(
            parseFloat(objetivo_profissional.salario)
              .toFixed(2)
              .replace('.', ','),
          ),
        },
        {
          label: 'Regime de contratação',
          value: RegimeContratualChoices.findByIntValue(
            objetivo_profissional.regime_contratual,
          )?.label,
        },
        {
          label: 'Jornada de trabalho',
          value: JornadaTrabalhoChoices.findByIntValue(
            objetivo_profissional.jornada_trabalho,
          )?.label,
        },
      ]);
    }
  }, [objetivo_profissional]);

  return (
    <CardPerfil
      title={'Objetivo Profissional'}
      button={{
        label: 'Editar objetivo profissional',
        href: `/candidato/objetivo-profissional/${objetivo_profissional?.id}/editar`,
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

export default CardPerfilObjetivoProfissional;
