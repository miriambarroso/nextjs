import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import vagasSchema from '@/components/pesquisa/vagasSchema';
import InputSalario from '@/components/atoms/inputs/InputSalario';
import SelectModeloTrabalho from '@/components/atoms/inputs/SelectModeloTrabalho';
import SelectRegimeContratual from '@/components/atoms/inputs/SelectRegimeContratual';
import SelectJornadaTrabalho from '@/components/atoms/inputs/SelectJornadaTrabalho';
import InputNomeFantasia from '@/components/atoms/inputs/InputNomeFantasia';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import { IVaga } from '@/interfaces/vaga';
import VagaService from '@/services/VagaService';
import CandidaturaService from '@/services/CandidaturaService';
import { useAuthStore } from '@/store/auth';
import { toastError, toastSuccess } from '@/utils/toasts';
import { omitBy, range } from 'lodash';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import {
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';
import PaginationService from '@/services/PaginationService';
import InfiniteScroller from '@/components/InfiniteScroller';
import { BiLoaderCircle } from 'react-icons/bi';
import { currencyMask } from '@/utils/masks';
import useEffectTimeout from '@/hooks/useEffectTimeout';

type QueueProps = {
  termo?: string;
  empresa?: string;
  salario?: number;
  modelo_trabalho?: number;
  regime_contratual?: number;
  jornada_trabalho?: number;
  selecionado?: number;
  recommendation?: string;
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
  const [vagasPagination, setVagasPagination] =
    useState<PaginationService<IVaga>>();
  const [recomendedVagasPagination, setRecomendedVagasPagination] =
    useState<PaginationService<IVaga>>();
  const [vagas, setVagas] = useState<IVaga[]>();
  const [recomendedVagas, setRecomendedVagas] = useState<IVaga[]>();
  const [selectedVaga, setSelectedVaga] = useState<IVaga>(null);
  const scrollDetail = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    scrollDetail.current.scrollTo(0, 0);
  }, [selectedVaga]);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(vagasSchema),
  });

  const {
    empresa,
    salario,
    modelo_trabalho,
    regime_contratual,
    jornada_trabalho,
  } = watch();

  const router = useRouter();
  const query = router.query;
  const { termo, selecionado } = query;

  const handleSearch = async (query: QueueProps) => {
    try {
      const clearQuery = omitBy(query, (v) => !v);
      const data = await VagaService.getAll(clearQuery);
      setVagasPagination(new PaginationService(data));
      setVagas(data.results);

      if (data.results.length > 0) {
        setSelectedVaga(data.results[0]);
      }
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  const handleRecomendedSearch = async (query: QueueProps) => {
    try {
      const clearQuery = omitBy({ ...query, recomendacao: true }, (v) => !v);
      const data = await VagaService.getAll(clearQuery);
      setRecomendedVagasPagination(new PaginationService(data));
      setRecomendedVagas(data.results);
    } catch (error) {
      toastError('Erro ao buscar vagas');
    }
  };

  const handleVagasNextPage = async () => {
    try {
      if (!vagasPagination?.hasNext()) return;

      const paginationData = await vagasPagination.fetchNext();
      setVagasPagination(paginationData);
      setVagas((v) => [...v, ...paginationData.results]);
    } catch (error) {
      toastError('Erro ao buscar próxima página');
    }
  };

  const handleRecomendedVagasNextPage = async () => {
    try {
      const paginationData = await recomendedVagasPagination.fetchNext();
      setRecomendedVagasPagination(paginationData);
      setRecomendedVagas((v) => [...v, ...paginationData.results]);
    } catch (error) {
      toastError('Erro ao buscar próxima página');
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
      handleSearch({
        empresa,
        salario: salario && currencyMask.unmask(salario),
        modelo_trabalho,
        regime_contratual,
        jornada_trabalho,
        termo: termo as string,
        selecionado: selecionado as unknown as number,
      });

      if (user) {
        handleRecomendedSearch({
          empresa,
          salario: salario && currencyMask.unmask(salario),
          modelo_trabalho,
          regime_contratual,
          jornada_trabalho,
          termo: termo as string,
          selecionado: selecionado as unknown as number,
        });
      }
    },
    300,
    [
      empresa,
      salario,
      modelo_trabalho,
      regime_contratual,
      jornada_trabalho,
      termo,
      selecionado,
      user,
    ],
  );

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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <InputNomeFantasia
              register={register}
              error={errors.empresa?.message}
              label={'Empresa'}
              name={'empresa'}
              required={false}
              labelClassName={'text-white'}
            />
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
      <div className="mb-8 mt-4 space-y-2 container">
        {isCandidato() && (
          <div>
            <div className="w-full">
              <div className="label">
                <span className="label-text">
                  Recomendações para o candidato (
                  <TextSkeleton
                    as={'span'}
                    className="h-4 w-8 bg-base-200 mr-2"
                  >
                    {recomendedVagasPagination?.count}
                  </TextSkeleton>{' '}
                  vagas)
                </span>
              </div>
              <div className="w-full">
                <div
                  className="overflow-x-auto flex snap-x snap-mandatory bg-white p-0 lg:p-4 rounded"
                  onScroll={() => setIsExpanded(false)}
                >
                  {recomendedVagas ? (
                    recomendedVagas?.length > 0 ? (
                      recomendedVagas?.map((vaga, index) => (
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
                          isExpandable={true}
                          isExpanded={isExpanded}
                          onExpanded={() => setIsExpanded((prev) => !prev)}
                          isFeature={false}
                          isCandidated={candidaturas?.some(
                            (i) => i.vaga == vaga.id,
                          )}
                        />
                      ))
                    ) : (
                      <div>Não há vagas recomendadas para você</div>
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
        )}

        <div className="lg:flex gap-8">
          <div className="lg:w-4/12">
            <div className="label">
              <span className="label-text">
                Resultado a partir da busca ({vagasPagination?.count} vagas)
              </span>
            </div>
            <div className="w-full ">
              <div className="flex flex-col lg:grid lg:grid-cols-1 p-0 lg:p-4 rounded lg:bg-white gap-4">
                {vagas ? (
                  vagas?.length > 0 ? (
                    vagas?.map((vaga) => (
                      <CardDetailVaga
                        key={vaga.id}
                        vaga={vaga}
                        isOwner={userEmpresa?.id == vaga.empresa.id}
                        onAction={() => {
                          setSelectedVaga(vaga);
                        }}
                        onClick={() => handleCandidate(vaga.id)}
                        selected={vaga.id === selectedVaga?.id}
                        isExpandable={true}
                        isFeature={false}
                        canCandidate={true}
                        isCandidated={candidaturas?.some(
                          (i) => i.vaga == vaga.id,
                        )}
                      />
                    ))
                  ) : (
                    <div className="py-8">
                      <p className="text-center">Não foram encontradas vagas</p>
                    </div>
                  )
                ) : (
                  <CardDetailVaga
                    vaga={null}
                    isOwner={false}
                    isFeature={false}
                    skeleton={3}
                    className="snap-center"
                  />
                )}
                <InfiniteScroller callback={handleVagasNextPage}>
                  <div className="flex items-center justify-center">
                    <BiLoaderCircle className="text-3xl animate-spin" />
                  </div>
                </InfiniteScroller>
              </div>
            </div>
          </div>
          <div className="lg:w-8/12 hidden lg:block">
            <div className="label">
              <span className="label-text">Detalhes da vaga selecionada</span>
            </div>
            <div
              className="sticky top-0 lg:max-h-screen lg:overflow-y-auto flex w-full bg-white rounded"
              ref={scrollDetail}
            >
              {selectedVaga ? (
                <CardDetailVaga
                  vaga={selectedVaga}
                  onClick={() => handleCandidate(selectedVaga.id)}
                  canCandidate={true}
                  isOwner={userEmpresa?.id == selectedVaga.empresa.id}
                  isCandidated={candidaturas?.some(
                    (i) => i.vaga == selectedVaga.id,
                  )}
                />
              ) : (
                <div className="card rounded w-full bg-white shadow h-48">
                  <div className="card-body items-center justify-center">
                    <h2 className="text-center font-noto-sans">
                      Selecione uma vaga para detalhar
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Page.overrideLayout = '';

export default Page;
