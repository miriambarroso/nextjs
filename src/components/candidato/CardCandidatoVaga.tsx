import Link from 'next/link';
import { BiGlasses, BiHome, BiTime } from 'react-icons/bi';
import { BadgeGroup } from '@/components/atoms/Badge';
import {
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useModal from '@/hooks/useModal';
import ConfirmModal from '@/components/atoms/ConfirmModal';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { useAuthStore } from '@/store/auth';
import { classNames } from '@/utils';
import Router from 'next/router';
import { toastWarning } from '@/utils/toasts';
import { formatDateToLocale } from '@/utils/date';
import { currencyMask } from '@/utils/masks';
import { range } from 'lodash';
import useBreakpoint from '@/hooks/useBreakpoint';
import { ICandidatoList } from '@/interfaces/candidato';

type Props = {
  candidato: ICandidatoList;
  isFeature?: boolean;
  isOwner?: boolean;
  selected?: boolean;
  onAction?: () => void;
  onClick?: () => void;
  onDelete?: (id: number) => void;
  onExpanded?: () => void;
  className?: string;
  skeleton?: number;
  isExpandable?: boolean;
  isExpanded?: boolean;
  canCandidate?: boolean;
  isCandidated?: boolean;
};

const CardDetailCandidato = ({
  candidato,
  selected,
  onClick,
  onDelete,
  onAction,
  onExpanded,
  isOwner,
  isFeature,
  className,
  isExpandable,
  isExpanded,
  skeleton = null,
  canCandidate = false,
  isCandidated,
}: Props) => {
  const topRef = useRef<HTMLDivElement>(null);
  const [itemId, setItemId] = useState<number>(null);
  const { open, toggle } = useModal();
  const [isGuest, isCandidato] = useAuthStore((state) => [
    state.isGuest,
    state.isCandidato,
  ]);
  const [expanded, setExpanded] = useState<boolean>(isExpanded);
  const { isBreakpoint } = useBreakpoint();

  const badges = [
    {
      kind: 'base',
      icon: <BiGlasses />,
      label: RegimeContratualChoices.findByIntValue(
        candidato?.objetivo_profissional.regime_contratual,
      )?.label,
    },
    {
      kind: 'base',
      icon: <BiHome />,
      label: ModeloTrabalhoChoices.findByIntValue(
        candidato?.objetivo_profissional.modelo_trabalho,
      )?.label,
    },
    {
      kind: 'base',
      icon: <BiTime />,
      label: JornadaTrabalhoChoices.findByIntValue(
        candidato?.objetivo_profissional.jornada_trabalho,
      )?.label,
    },
  ];

  const handleGuestCandidate = () => {
    toastWarning('Você precisa estar logado para se candidatar');
    return Router.push('/login');
  };

  const handleAction = () => {
    if (isExpandable && isBreakpoint('lg')) {
      setExpanded(!expanded);
      onExpanded && onExpanded();
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      onAction && onAction();
    }
  };

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  // useEffect(() => {
  //   setExpanded(false);
  //
  // }, [breakpoint]);

  const btnAction = () =>
    canCandidate &&
    !isOwner &&
    (isGuest() || isCandidato()) && (
      <button
        className={classNames(
          ' btn btn-sm btn-wide lg:w-max',
          isCandidated && 'btn-error',
        )}
        onClick={(e) => {
          e.stopPropagation();
          isGuest() ? handleGuestCandidate() : onClick();
        }}
      >
        {isCandidated ? 'Cancelar candidatura' : 'Candidatar-se'}
      </button>
    );

  const renderItem = (vaga: ICandidatoList, index?: number, ref?) => {
    return (
      <div
        ref={ref}
        key={index}
        className={classNames(
          'card rounded w-full bg-white',
          (onAction || isFeature) && 'cursor-pointer',
          selected ? 'lg:bg-gray-100' : 'bg-white',
          className,
        )}
        onClick={handleAction}
      >
        <div className="card-body p-4">
          <div className="flex">
            <div>
              <h2 className="card-title font-noto-sans">
                <TextSkeleton className="h-6 w-48 bg-base-100">
                  {vaga?.cargo}
                </TextSkeleton>
              </h2>
              <p className="text-sm text-fade">
                <TextSkeleton as="span">
                  {vaga?.created_at && formatDateToLocale(vaga?.created_at)}
                </TextSkeleton>
              </p>
            </div>
            {isOwner && !isFeature && (
              <div className="ml-auto flex flex-col gap-2">
                <Link
                  onClick={(e) => e.stopPropagation()}
                  href={`/empresa/vaga/${vaga?.id}/editar`}
                  className="link link-hover link-neutral text-sm"
                >
                  Editar
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemId(vaga.id);
                    toggle();
                  }}
                  className={'link link-hover link-error text-sm '}
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
          <div className="lg:flex flex-wrap items-center justify-between space-y-4 lg:space-y-0 gap-4">
            <BadgeGroup badges={badges} />
            {!isExpandable && !isFeature && btnAction()}
          </div>

          {/*{skeleton || (isExpandable && !expanded) || isFeature ? (*/}
          {/*  <p className="whitespace-pre-line truncate-4">*/}
          {/*    <TextSkeleton*/}
          {/*      as="span"*/}
          {/*      className="h-4 w-full bg-base-100"*/}
          {/*      rows={4}*/}
          {/*    >*/}
          {/*      {vaga?.atividades}*/}
          {/*    </TextSkeleton>*/}
          {/*  </p>*/}
          {/*) : (*/}
          {/*  <>*/}
          {/*    {vaga?.atividades && (*/}
          {/*      <div>*/}
          {/*        <p className="text-fade">Atividades envolvidas na cargo</p>*/}
          {/*        <p className="whitespace-pre-line">{vaga?.atividades}</p>*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*    {vaga?.requisitos && (*/}
          {/*      <div>*/}
          {/*        <h2 className="text-fade">*/}
          {/*          Requisitos necessários ou desejáveis*/}
          {/*        </h2>*/}
          {/*        <p className="whitespace-pre-line">{vaga?.requisitos}</p>*/}
          {/*      </div>*/}
          {/*    )}*/}

          {/*    {!!vaga?.beneficios.length && (*/}
          {/*      <div>*/}
          {/*        <h2 className="text-fade">Benefícios</h2>*/}
          {/*        <ul className="list list-disc list-inside">*/}
          {/*          {vaga?.beneficios?.map((beneficio) => (*/}
          {/*            <li key={beneficio.id}>{beneficio.nome}</li>*/}
          {/*          ))}*/}
          {/*        </ul>*/}
          {/*      </div>*/}
          {/*    )}*/}

          {/*    <div className="divider"></div>*/}
          {/*  </>*/}
          {/*)}*/}

          {/*<div>*/}
          {/*  <h2 className="text-fade">Candidatos</h2>*/}
          {/*  <ul className="list list-disc list-inside">*/}
          {/*    {vaga?.beneficios?.map((beneficio) => (*/}
          {/*      <li key={beneficio.id}>{beneficio.nome}</li>*/}
          {/*    ))}*/}
          {/*  </ul>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  };

  return (
    <>
      {skeleton
        ? range(skeleton).map((i) => renderItem(null, i))
        : renderItem(candidato, null, topRef)}
      {isOwner && (
        <ConfirmModal
          open={open}
          close={toggle}
          confirm={() => onDelete(itemId)}
          title={'Excluir vaga'}
          message={'Deseja realmente excluir esta vaga?'}
        />
      )}
    </>
  );
};

export default CardDetailCandidato;
