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
import { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import ConfirmModal from '@/components/atoms/ConfirmModal';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { useAuthStore } from '@/store/auth';
import { classNames } from '@/utils';
import Router from 'next/router';
import { toastWarning } from '@/utils/toasts';

type Props = {
  vaga: IVaga;
  onDelete?: (id: number) => void;
  isCandidato?: boolean;
  isEmpresa?: boolean;
  isOwner?: boolean;
  action?: () => void;
};

const CardDetailVaga = ({
  vaga,
  onDelete,
  isCandidato,
  isOwner,
  action,
}: Props) => {
  const [itemId, setItemId] = useState<number>(null);
  const { open, toggle } = useModal();
  const candidaturas = useAuthStore((state) => state.candidaturas);
  const isGuest = useAuthStore((state) => state.isGuest);

  const [isCandidatado, setIsCandidatado] = useState<boolean>(false);

  useEffect(() => {
    setIsCandidatado(candidaturas.some((i) => i.vaga == vaga.id));
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
      label: vaga?.quantidade_vagas + ' vagas',
    },
  ];

  const handleGuestCandidate = () => {
    toastWarning('Você precisa estar logado para se candidatar');
    return Router.push('/login');
  };

  return (
    <>
      <div className="card rounded w-full bg-white shadow">
        <div className="card-body">
          <div className="flex">
            <div>
              <TextSkeleton>
                <h2 className="card-title font-noto-sans">{vaga?.cargo}</h2>
              </TextSkeleton>
              <span className="text-sm text-fade">
                {formatDateToLocale(vaga?.created_at ?? '')}
              </span>
            </div>
            {isOwner && (
              <div className="ml-auto flex flex-col gap-2">
                <Link
                  href={`/empresa/vaga/${vaga.id}/editar`}
                  className="link link-hover link-neutral text-sm"
                >
                  Editar
                </Link>
                <button
                  onClick={() => {
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
          <div className="lg:flex items-center">
            <BadgeGroup badges={badges} />
            {isCandidato && (
              <button
                onClick={action}
                className={classNames(
                  'ml-auto btn btn-sm',
                  isCandidatado && 'btn-error',
                )}
              >
                {isCandidatado ? 'Cancelar candidatura' : 'Candidatar-se'}
              </button>
            )}
            {isGuest() && (
              <div className="ml-auto flex flex-col gap-2">
                <button
                  onClick={handleGuestCandidate}
                  className={classNames(
                    'btn btn-sm',
                    isCandidatado && 'btn-error',
                  )}
                >
                  Candidatar-se
                </button>
              </div>
            )}
          </div>

          {vaga?.atividades && (
            <div>
              <p className="text-fade">Atividades envolvidas na cargo</p>
              <p className="whitespace-pre-line">{vaga?.atividades}</p>
            </div>
          )}
          {vaga?.requisitos && (
            <div>
              <h2 className="text-fade">
                Requisitos necessários ou desejáveis
              </h2>
              <p className="whitespace-pre-line">{vaga?.requisitos}</p>
            </div>
          )}

          {!!vaga?.beneficios.length && (
            <div>
              <h2 className="text-fade">Benefícios</h2>
              <ul className="list list-disc list-inside">
                {vaga?.beneficios?.map((beneficio) => (
                  <li key={beneficio.id}>{beneficio.nome}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="divider"></div>

          {/*<div>*/}
          {/*  <h2 className="text-fade">Candidatos</h2>*/}
          {/*  <ul className="list list-disc list-inside">*/}
          {/*    {vaga?.beneficios?.map((beneficio) => (*/}
          {/*      <li key={beneficio.id}>{beneficio.nome}</li>*/}
          {/*    ))}*/}
          {/*  </ul>*/}
          {/*</div>*/}
          <div className="card-actions items-center">
            {!isOwner && (
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
                <p>{vaga?.empresa?.nome_fantasia}</p>
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

export default CardDetailVaga;
