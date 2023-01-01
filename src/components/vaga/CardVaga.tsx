import { IVaga } from '@/interfaces/vaga';
import { formatDateToLocale } from '@/utils/date';
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

type Props = {
  vaga: IVaga;
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
  className,
  skeleton = null,
}: Props) => {
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
          'card rounded w-full cursor-pointer',
          selected ? 'bg-gray-100' : 'bg-white',
          className,
        )}
        onClick={onClick}
      >
        <div className="card-body p-4">
          <div>
            <h2 className="card-title font-noto-sans">
              <TextSkeleton className="h-6 w-48 bg-base-100">
                {vaga?.cargo}
              </TextSkeleton>
            </h2>
            <span className="text-sm text-fade">
              <TextSkeleton className="h-4 w-32 bg-base-100">
                {vaga?.created_at ? formatDateToLocale(vaga?.created_at) : null}
              </TextSkeleton>
            </span>
          </div>
          <BadgeGroup badges={badges} />
          <p className="truncate-4">
            <TextSkeleton as="span" className="h-4 w-full bg-base-100" rows={4}>
              {vaga?.atividades}
            </TextSkeleton>
          </p>
          <div className="card-actions items-center">
            {isCandidato && (
              <div className="flex items-center gap-2">
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
                    {vaga?.empresa}
                  </TextSkeleton>
                </p>
              </div>
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
