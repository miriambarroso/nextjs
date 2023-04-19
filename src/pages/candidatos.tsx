import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import vagasSchema from '@/components/pesquisa/vagasSchema';
import InputSalario from '@/components/atoms/inputs/InputSalario';
import SelectModeloTrabalho from '@/components/atoms/inputs/SelectModeloTrabalho';
import SelectRegimeContratual from '@/components/atoms/inputs/SelectRegimeContratual';
import SelectJornadaTrabalho from '@/components/atoms/inputs/SelectJornadaTrabalho';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import CandidaturaService from '@/services/CandidaturaService';
import { EMPREGADOR, useAuthStore } from '@/store/auth';
import { toastError, toastSuccess } from '@/utils/toasts';
import { omitBy, range } from 'lodash';
import useEffectTimeout from '@/hooks/useEffectTimeout';
import {
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';
import { currencyMask } from '@/utils/masks';
import CandidatoService from '@/services/CandidatoService';
import { ICandidatoPerfil } from '@/interfaces/candidato';
import CardDetailCandidato from '@/components/candidato/CardDetailCandidato';
import { IPagination } from '@/interfaces/pagination';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { classNames } from '@/utils';
import VagaService from '@/services/VagaService';
import { IVaga } from '@/interfaces/vaga';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import PaginationService from '@/services/PaginationService';
import { BiLoaderCircle } from 'react-icons/bi';
import InfiniteScroller from '@/components/InfiniteScroller';
import useOnMounted from '@/hooks/useOnMouted';

type QueueProps = {
  termo?: string;
  empresa?: string;
  salario?: number;
  modelo_trabalho?: number;
  regime_contratual?: number;
  jornada_trabalho?: number;
  selecionado?: number;
  vaga?: number;
  recomendacao?: boolean;
};

const Page = () => {
  const [user, candidaturas, setCandidaturas, isCandidato, userEmpresa] =
    useAuthStore((state) => [
      state.user,
      state.candidaturas,
      state.setCandidaturas,
      state.isCandidato,
      state.empresa,
    ]);
  const [candidatoPagination, setCandidatoPagination] =
    useState<PaginationService<ICandidatoPerfil>>();
  const [recommendedCandidatosPagination, setRecommendedCandidatosPagination] =
    useState<PaginationService<ICandidatoPerfil>>();
  const [recommendedCandidatos, setRecommendedCandidatos] = useState<
    ICandidatoPerfil[]
  >([]);
  const [candidatos, setCandidatos] = useState<ICandidatoPerfil[]>([]);
  const [selectedCandidato, setSelectedCandidato] =
    useState<ICandidatoPerfil>();
  const scrollDetail = useRef<HTMLDivElement>(null);
  const [vagaPagination, setVagaPagination] = useState<IPagination<IVaga>>();
  const [vagas, setVagas] = useState<IVaga[]>();
  const [selectedVaga, setSelectedVaga] = useState<IVaga>();
  const mounted = useRef(false);

  useEffect(() => {
    scrollDetail.current.scrollTo(0, 0);
  }, [selectedCandidato]);

  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(vagasSchema),
  });

  const router = useRouter();
  const query = router.query;

  const { salario, modelo_trabalho, regime_contratual, jornada_trabalho } =
    watch();

  const { termo, selecionado } = query;

  const fetchVagas = async () => {
    try {
      const data = await VagaService.getVagasEmpresa(userEmpresa?.id);
      const { results } = data;
      const firstVaga = results.length > 0 ? results[0] : null;
      setSelectedVaga(firstVaga);
      setVagas(results);
      setVagaPagination(data);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  const handleSearch = async (query: QueueProps) => {
    try {
      const clearQuery = omitBy(query, (v) => !v);
      const data = await CandidatoService.getAll(clearQuery);
      const { results } = data;

      setCandidatoPagination(new PaginationService(data));
      setSelectedCandidato(results.length > 0 ? results[0] : null);
      setCandidatos(results);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  const handleRecommendedSearch = async (query: QueueProps) => {
    try {
      const clearQuery = omitBy(query, (v) => !v);
      const data = await CandidatoService.getAll(clearQuery);
      const { results } = data;

      setRecommendedCandidatosPagination(new PaginationService(data));
      setRecommendedCandidatos(results);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  const handleCandidatosNextPage = async () => {
    try {
      if (!candidatoPagination?.hasNext()) return;

      const paginationData = await candidatoPagination.fetchNext();
      setCandidatoPagination(paginationData);
      setCandidatos((v) => [...v, ...paginationData.results]);
    } catch (error) {
      toastError('Erro ao buscar candidatos');
    }
  };

  const handleCandidate = async (id: number) => {
    try {
      const item = candidaturas.findIndex((i) => i.vaga == id);

      if (item > -1) {
        await CandidaturaService.delete(candidaturas[item].id);
        toastSuccess('Candidatura cancelada!');
        let newCandidaturas = candidaturas;
        newCandidaturas.splice(item, 1);
        setCandidaturas([...newCandidaturas]);
      } else {
        const data = await CandidaturaService.create({
          vaga: id,
          usuario: user?.id,
        });
        toastSuccess('Candidatura realizada!');
        setCandidaturas([...candidaturas, data]);
      }
    } catch (error) {
      toastError('Erro ao realizar candidatura!');
    }
  };

  useEffectTimeout(
    () => {
      if (!mounted.current) return;
      if (!user) return;
      else if (!vagas) fetchVagas();

      if (selectedVaga) {
        handleSearch({
          salario: salario && currencyMask.unmask(salario),
          modelo_trabalho,
          regime_contratual,
          jornada_trabalho,
          termo: termo as string,
          selecionado: selecionado as unknown as number,
          vaga: selectedVaga?.id,
        });

        handleRecommendedSearch({
          salario: salario && currencyMask.unmask(salario),
          modelo_trabalho,
          regime_contratual,
          jornada_trabalho,
          termo: termo as string,
          selecionado: selecionado as unknown as number,
          recomendacao: true,
          vaga: selectedVaga?.id,
        });
      }

      router.replace({
        query: omitBy(
          {
            modelo_trabalho,
            regime_contratual,
            jornada_trabalho,
            termo,
            selecionado,
            salario: salario && currencyMask.unmask(salario),
          },
          (v) => !v,
        ),
      });
    },
    300,
    [
      salario,
      modelo_trabalho,
      regime_contratual,
      jornada_trabalho,
      termo,
      selecionado,
      user,
      selectedVaga,
      mounted.current,
    ],
  );

  useOnMounted(() => {
    if (query && !mounted.current) {
      reset({
        ...query,
        salario: query.salario && currencyMask.mask(query.salario),
      });
      mounted.current = true;
    }
  }, [query]);

  const modeloTrabalhoChoices = [
    {
      label: 'Selecione o modelo de trabalho',
      value: '',
      selected: true,
      disabled: false,
    },
    ...ModeloTrabalhoChoices.choices,
  ];

  const regimeContratualChoices = [
    {
      label: 'Selecione o regime de contratação',
      value: '',
      selected: true,
      disabled: false,
    },
    ...RegimeContratualChoices.choices,
  ];

  const jornadaTrabalhoChoices = [
    {
      label: 'Selecione o jornada de trabalho',
      value: '',
      selected: true,
      disabled: false,
    },
    ...JornadaTrabalhoChoices.choices,
  ];

  return (
    <>
      <div className="bg-neutral w-full">
        <form className="container pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputSalario
              register={register}
              error={errors.salario?.message}
              labelClassName={'text-white'}
            />
            <SelectModeloTrabalho
              register={register}
              error={errors.modelo_trabalho?.message}
              labelClassName={'text-white'}
              choices={modeloTrabalhoChoices}
            />
            <SelectRegimeContratual
              register={register}
              error={errors.regime_contratual?.message}
              labelClassName={'text-white'}
              choices={regimeContratualChoices}
            />
            <SelectJornadaTrabalho
              register={register}
              error={errors.jornada_trabalho?.message}
              labelClassName={'text-white'}
              choices={jornadaTrabalhoChoices}
            />
          </div>
        </form>
      </div>
      <div className="mb-8 mt-4 space-y-2 container ">
        <div>
          <div className="w-full">
            <div className="label">
              <span className="label-text">
                Sua vagas cadastradas (
                <TextSkeleton as={'span'} className="h-4 w-8 bg-base-200 mr-2">
                  {vagaPagination?.count}
                </TextSkeleton>{' '}
                vagas)
              </span>
            </div>
            <div className="w-full">
              <div className="overflow-x-auto flex snap-x snap-mandatory bg-white p-0 lg:p-4 rounded">
                {vagas ? (
                  vagas?.length > 0 ? (
                    vagas?.map((vaga, index) => (
                      <CardDetailVaga
                        key={vaga.id}
                        vaga={vaga}
                        isOwner={userEmpresa?.id == vaga.empresa.id}
                        onAction={() => {
                          setSelectedVaga(vaga);
                        }}
                        onClick={() => handleCandidate(vaga.id)}
                        selected={vaga.id === selectedVaga?.id}
                        className="snap-center flex-none lg:w-4/12"
                        canCandidate={true}
                        isFeature={true}
                        isCandidated={candidaturas?.some(
                          (i) => i.vaga == vaga.id,
                        )}
                      />
                    ))
                  ) : (
                    <div>Não há vagas cadastradas por você</div>
                  )
                ) : (
                  range(3).map((_, index) => (
                    <CardDetailVaga
                      key={index}
                      vaga={null}
                      isOwner={false}
                      skeleton={1}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex gap-8">
          <div className={classNames(user ? 'lg:w-3/12' : 'lg:w-4/12')}>
            <div className="label">
              <span className="label-text">
                Resultado a partir da busca ({candidatoPagination?.count}{' '}
                candidatos)
              </span>
            </div>
            <div className="w-full ">
              <div className="flex flex-col lg:grid lg:grid-cols-1 p-0 lg:p-4 rounded lg:bg-white gap-4">
                {candidatos ? (
                  candidatos?.length > 0 ? (
                    candidatos?.map((candidato) => (
                      <CardDetailCandidato
                        key={candidato.id}
                        candidato={candidato}
                        onAction={() => {
                          setSelectedCandidato(candidato);
                        }}
                        onClick={() => handleCandidate(candidato.id)}
                        // selected={candidato.id === selectedCandidato?.id}
                        isExpandable={true}
                        isFeature={false}
                        canCandidate={true}
                        isCandidated={candidaturas?.some(
                          (i) => i.id == candidato.id,
                        )}
                      />
                    ))
                  ) : (
                    <div className="py-8">
                      <p className="text-center">
                        Não há candidatos para esta vaga
                      </p>
                    </div>
                  )
                ) : (
                  <CardDetailCandidato
                    candidato={null}
                    isOwner={false}
                    isFeature={false}
                    skeleton={3}
                    className="snap-center"
                  />
                )}
                <InfiniteScroller callback={handleCandidatosNextPage}>
                  <div className="flex items-center justify-center">
                    <BiLoaderCircle className="text-3xl animate-spin" />
                  </div>
                </InfiniteScroller>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'hidden lg:block',
              user ? 'lg:w-6/12' : 'lg:w-8/12',
            )}
          >
            <div className="label">
              <span className="label-text">
                Detalhes do candidato selecionado
              </span>
            </div>
            <div
              className="sticky top-0 lg:max-h-screen lg:overflow-y-auto flex w-full bg-white rounded"
              ref={scrollDetail}
            >
              {selectedCandidato ? (
                <CardDetailCandidato
                  candidato={selectedCandidato}
                  onClick={() => handleCandidate(selectedCandidato.id)}
                  canCandidate={true}
                  isDetail={true}
                  isCandidated={candidaturas?.some(
                    (i) => i.vaga == selectedCandidato.id,
                  )}
                />
              ) : (
                <div className="card rounded w-full bg-white shadow h-48">
                  <div className="card-body items-center justify-center">
                    <h2 className="text-center font-noto-sans">
                      Selecione um candidato para detalhar
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={classNames(user ? 'lg:w-3/12' : 'hidden')}>
            <div className="label">
              <span className="label-text">
                Recomendações de candidatos (
                <TextSkeleton as={'span'} className="h-4 w-8 bg-base-200 mr-2">
                  {recommendedCandidatosPagination?.count}
                </TextSkeleton>{' '}
                candidatos)
              </span>
            </div>
            <div className="w-full ">
              <div className="flex flex-col lg:grid lg:grid-cols-1 p-0 lg:p-4 rounded lg:bg-white gap-4">
                {recommendedCandidatos ? (
                  recommendedCandidatos?.length > 0 ? (
                    recommendedCandidatos?.map((candidato) => (
                      <CardDetailCandidato
                        key={candidato.id}
                        candidato={candidato}
                        onAction={() => {
                          setSelectedCandidato(candidato);
                        }}
                        onClick={() => handleCandidate(candidato.id)}
                        // selected={candidato.id === selectedCandidato?.id}
                        isExpandable={true}
                        isFeature={false}
                        canCandidate={true}
                        isCandidated={candidaturas?.some(
                          (i) => i.id == candidato.id,
                        )}
                      />
                    ))
                  ) : (
                    <div className="py-8">
                      <p className="text-center">
                        Não há recomendações de candidatos para esta vaga
                      </p>
                    </div>
                  )
                ) : (
                  <CardDetailCandidato
                    candidato={null}
                    isOwner={false}
                    isFeature={false}
                    skeleton={3}
                    className="snap-center"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Page.overrideLayout = '';
Page.permissions = [EMPREGADOR];

export default Page;
