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
import { useState } from 'react';
import useModal from '@/hooks/useModal';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { classNames } from '@/utils';

type Props = {
  vaga: IVaga;
  isCandidato?: boolean;
  isOwner?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

const CardVaga = ({ vaga, selected, onClick, isCandidato, isOwner }: Props) => {
  const [itemId, setItemId] = useState<number>(null);
  const { open, toggle } = useModal();

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
      label: vaga?.quantidade_vagas + ' vagas',
    },
  ];

  return (
    <>
      <div
        className={classNames(
          'card rounded w-full cursor-pointer',
          selected ? 'bg-gray-100' : 'bg-white',
        )}
        onClick={onClick}
      >
        <div className="card-body p-4">
          <div className="flex">
            <div>
              <TextSkeleton>
                <h2 className="card-title font-noto-sans">{vaga?.cargo}</h2>
              </TextSkeleton>
              <span className="text-sm text-fade">
                {formatDateToLocale(vaga?.created_at ?? '')}
              </span>
            </div>
            {/*<div className="ml-auto flex flex-col gap-2">*/}
            {/*  <Link*/}
            {/*    href={`/empresa/vaga/${vaga.id}/editar`}*/}
            {/*    className="link link-hover link-neutral text-sm"*/}
            {/*  >*/}
            {/*    Editar*/}
            {/*  </Link>*/}
            {/*  <button*/}
            {/*    onClick={() => {*/}
            {/*      setItemId(vaga.id);*/}
            {/*      toggle();*/}
            {/*    }}*/}
            {/*    className={'link link-hover link-error text-sm '}*/}
            {/*  >*/}
            {/*    Excluir*/}
            {/*  </button>*/}
            {/*</div>*/}
          </div>
          <BadgeGroup badges={badges} />
          <p>{vaga?.atividades}</p>
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
                <p>{vaga?.empresa}</p>
              </div>
            )}
            {isOwner && (
              <Link
                href={`/empresa/vaga/${vaga?.id}`}
                className="link link-hover link-neutral text-sm ml-auto"
              >
                Ver candidatos
              </Link>
            )}
          </div>
        </div>

        {/*<figure>*/}
        {/*  <img src="https://placeimg.com/400/225/arch" alt="Shoes" />*/}
        {/*</figure>*/}
      </div>
    </>
  );
};

export default CardVaga;
