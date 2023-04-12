import { BiGlasses, BiHome, BiTime } from 'react-icons/bi';
import { BadgeGroup } from '@/components/atoms/Badge';
import {
  EstadoCivilChoices,
  FormacaoNivelChoices,
  IdiomaNivelChoices,
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
  SexoChoices,
} from '@/utils/choices';
import { useEffect, useRef, useState } from 'react';
import useModal from '@/hooks/useModal';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { useAuthStore } from '@/store/auth';
import { classNames } from '@/utils';
import Router from 'next/router';
import { toastWarning } from '@/utils/toasts';
import useBreakpoint from '@/hooks/useBreakpoint';
import { ICandidatoPerfil } from '@/interfaces/candidato';
import { formatDateToExtense, formatDateToLocale } from '@/utils/date';
import { range } from 'lodash';

type Props = {
  candidato: ICandidatoPerfil;
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
  isDetail?: boolean;
  isCandidated?: boolean;
};

const CardDetailCandidato = ({
  candidato,
  selected,
  onClick,
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
  isDetail = false,
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

  // const btnAction = () =>
  //   canCandidate &&
  //   !isOwner &&
  //   (isGuest() || isCandidato()) && (
  //     <button
  //       className={classNames(
  //         ' btn btn-sm btn-wide lg:w-max',
  //         isCandidated && 'btn-error',
  //       )}
  //       onClick={(e) => {
  //         e.stopPropagation();
  //         isGuest() ? handleGuestCandidate() : onClick();
  //       }}
  //     >
  //       {isCandidated ? 'Cancelar candidatura' : 'Candidatar-se'}
  //     </button>
  //   );

  const renderItem = (candidato: ICandidatoPerfil, index?: number, ref?) => {
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
                  {candidato?.nome}
                </TextSkeleton>
              </h2>
              <p className="text-sm text-fade mt-2">
                <TextSkeleton as="span">
                  {candidato?.objetivo_profissional.cargo}
                </TextSkeleton>
              </p>
              {!expanded && !isDetail ? (
                <ul>
                  <li>
                    <p className="">
                      <TextSkeleton as="span">
                        {candidato?.experiencia_profissional[0]?.cargo}
                      </TextSkeleton>
                    </p>
                    <p className="text-fade">
                      <TextSkeleton as="span">
                        {candidato?.experiencia_profissional[0]?.empresa}
                      </TextSkeleton>
                    </p>
                    <p className="text-sm text-fade uppercase">
                      <TextSkeleton as="span">
                        {skeleton
                          ? null
                          : formatDateToExtense(
                              candidato?.experiencia_profissional[0]
                                .data_inicio,
                            ) + candidato?.experiencia_profissional[0].data_fim
                          ? '- ' +
                            formatDateToExtense(
                              candidato?.experiencia_profissional[0].data_fim,
                            )
                          : '- Atual'}
                      </TextSkeleton>
                    </p>
                  </li>
                  <li>
                    <p className="">
                      <TextSkeleton as="span">
                        {skeleton
                          ? null
                          : FormacaoNivelChoices.findByIntValue(
                              candidato?.formacao_academica[0].nivel,
                            )?.label +
                            ' - ' +
                            candidato?.formacao_academica[0].curso}
                      </TextSkeleton>
                    </p>
                    <p className="text-fade">
                      <TextSkeleton as="span">
                        {candidato?.formacao_academica[0].instituicao}
                      </TextSkeleton>
                    </p>
                    <p className="text-sm text-fade uppercase">
                      <TextSkeleton as="span">
                        {skeleton
                          ? null
                          : formatDateToExtense(
                              candidato?.formacao_academica[0].data_inicio,
                            ) +
                            ' - ' +
                            candidato?.formacao_academica[0].data_conclusao
                          ? formatDateToExtense(
                              candidato?.formacao_academica[0].data_conclusao,
                            )
                          : 'Atual'}
                      </TextSkeleton>
                    </p>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
          <div className="lg:flex flex-wrap items-center justify-between space-y-4 lg:space-y-0 gap-4">
            <BadgeGroup badges={badges} />
            {/*{!isExpandable && !isFeature && btnAction()}*/}
          </div>

          {expanded || isDetail ? (
            <>
              <div>
                <p>
                  Estado Civil:{' '}
                  {
                    EstadoCivilChoices.findByIntValue(candidato.estado_civil)
                      ?.label
                  }
                </p>
                <p>
                  Data de Nascimento:{' '}
                  {formatDateToLocale(candidato.data_nascimento)}{' '}
                </p>
                <p>
                  Genero: {SexoChoices.findByIntValue(candidato.sexo)?.label}
                </p>
              </div>
              <div>
                <h2 className="text-fade">Idiomas</h2>
                <ul>
                  {candidato?.idioma.map((idioma, index) => (
                    <li key={index}>
                      <p className="">
                        <TextSkeleton as="span">
                          {idioma?.nome} -{' '}
                          {
                            IdiomaNivelChoices.findByIntValue(idioma.nivel)
                              ?.label
                          }
                        </TextSkeleton>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-fade">Formação acadêmica</h2>
                <ul>
                  {candidato?.formacao_academica.map((form, index) => (
                    <li key={index}>
                      <p className="">
                        <TextSkeleton as="span">
                          {
                            FormacaoNivelChoices.findByIntValue(form.nivel)
                              .label
                          }{' '}
                          - {form.curso}
                        </TextSkeleton>
                      </p>
                      <p className="text-sm text-fade uppercase">
                        <TextSkeleton as="span">
                          {formatDateToExtense(form.data_inicio)}
                          {' - '}
                          {form.data_conclusao
                            ? formatDateToExtense(form.data_conclusao)
                            : 'Atual'}
                        </TextSkeleton>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-fade">Experiência profissional</h2>
                <ul>
                  {candidato?.experiencia_profissional.map((exp, index) => (
                    <li key={index}>
                      <p className="">
                        <TextSkeleton as="span">
                          {exp.cargo} - {exp.empresa}
                        </TextSkeleton>
                      </p>
                      <p className="text-sm text-fade uppercase">
                        <TextSkeleton as="span">
                          {formatDateToExtense(exp.data_inicio)}
                          {' - '}
                          {exp.data_fim
                            ? formatDateToExtense(exp.data_fim)
                            : 'Atual'}
                        </TextSkeleton>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-fade">Cursos e Especializações</h2>
                <ul>
                  {candidato?.curso_especializacao.map((curso, index) => (
                    <li key={index}>
                      <p className="">
                        <TextSkeleton as="span">
                          {curso.curso} - {curso.instituicao}
                        </TextSkeleton>
                      </p>
                      <p className="text-sm text-fade uppercase">
                        <TextSkeleton as="span">
                          {formatDateToExtense(curso.data_conclusao)}
                          {' - '}
                          {curso.duracao_horas} horas
                        </TextSkeleton>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      {skeleton
        ? range(skeleton).map((i) => renderItem(null, i))
        : renderItem(candidato, null, topRef)}
    </>
  );
};

export default CardDetailCandidato;
