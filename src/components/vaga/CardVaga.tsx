import { IVaga } from '@/interfaces/vaga';
import Link from 'next/link';
import { BiGlasses, BiGroup, BiHome, BiTime } from 'react-icons/bi';
import { BadgeGroup } from '@/components/atoms/Badge';
import {
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';
import Image from 'next/image';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { classNames } from '@/utils';
import { range } from 'lodash';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { currencyMask } from '@/utils/masks';

type Props = {
  vaga: IVaga;
  isFeature?: boolean;
  isCandidato?: boolean;
  isOwner?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  skeleton?: number;
};

const CardVaga = ({
  vaga,
  selected,
  onClick,
  isCandidato,
  isOwner,
  isFeature,
  className,
  skeleton = null,
}: Props) => {
  const [candidaturas] = useAuthStore((state) => [state.candidaturas]);

  const [isCandidatado, setIsCandidatado] = useState<boolean>(false);

  useEffect(() => {
    setIsCandidatado(candidaturas.some((i) => i.vaga == vaga?.id));
  }, [candidaturas, vaga]);

  const badges = [
    {
      kind: 'base',
      icon: <BiGlasses />,
      label: RegimeContratualChoices.findByIntValue(vaga?.regime_contratual)
        ?.label,
    },
    {
      kind: 'base',
      icon: <BiHome />,
      label: ModeloTrabalhoChoices.findByIntValue(vaga?.modelo_trabalho)?.label,
    },
    {
      kind: 'base',
      icon: <BiTime />,
      label: JornadaTrabalhoChoices.findByIntValue(vaga?.jornada_trabalho)
        ?.label,
    },
    {
      kind: 'base',
      icon: <BiGroup />,
      label: vaga ? vaga?.quantidade_vagas + ' vagas' : null,
    },
  ];

  const renderItem = (vaga: IVaga, index?: number) => {
    return (
      <div
        key={index}
        className={classNames(
          'card rounded w-full ',
          selected ? 'bg-gray-100' : 'bg-white',
          className,
        )}
      >
        <div className="card-body p-4">
          <div onClick={onClick} className="cursor-pointer">
            <div className="mb-2">
              <h2 className="card-title font-noto-sans">
                <TextSkeleton as="span" className="h-6 w-48 bg-base-100">
                  {vaga?.cargo}
                </TextSkeleton>
              </h2>
              <p className="card-subtitle text-gray-500">
                <TextSkeleton as="span">
                  {vaga?.salario ? currencyMask.mask(vaga?.salario) : null}
                </TextSkeleton>
              </p>
              {/*<p className="text-sm text-fade">*/}
              {/*  <TextSkeleton>*/}
              {/*    {vaga?.created_at*/}
              {/*      ? formatDateToLocale(vaga?.created_at)*/}
              {/*      : null}*/}
              {/*  </TextSkeleton>*/}
              {/*</p>*/}
            </div>
            <BadgeGroup badges={badges} />
            <p className="truncate-4">
              <TextSkeleton
                as="span"
                className="h-4 w-full bg-base-100"
                rows={4}
              >
                {vaga?.atividades}
              </TextSkeleton>
            </p>
          </div>

          <div className="card-actions items-center mt-auto">
            {isCandidato && (
              <Link
                href={`/empresa/${vaga?.empresa?.id}`}
                className="flex items-center gap-2 rounded hover:bg-base-200 transition duration-150 p-2"
              >
                <div className="avatar">
                  <div className="w-10 rounded-full relative">
                    <Image
                      src="https://placeimg.com/400/225/arch"
                      fill
                      alt="Logo da empresa"
                    />
                  </div>
                </div>
                <p>
                  <TextSkeleton
                    as="span"
                    className="h-4 w-16
                   bg-base-100"
                  >
                    {vaga?.empresa?.nome_fantasia}
                  </TextSkeleton>
                </p>
              </Link>
            )}
            {isFeature && (
              <Link
                href={`/vaga/${vaga?.id}`}
                className={classNames(
                  'ml-auto btn btn-sm',
                  isCandidatado && 'btn-error',
                )}
              >
                {isCandidatado ? 'Cancelar candidatura' : 'Candidatar-se'}
              </Link>
            )}
            {vaga && isOwner && (
              <Link
                href={`/empresa/vaga/${vaga?.id}`}
                className="link link-hover link-neutral text-sm ml-auto"
              >
                Ver candidatos
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {skeleton
        ? range(skeleton).map((i) => renderItem(null, i))
        : renderItem(vaga)}
    </>
  );
};

export default CardVaga;
