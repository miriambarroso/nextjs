import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import vagasSchema from '@/components/pesquisa/vagasSchema';
import InputSalario from '@/components/atoms/inputs/InputSalario';
import SelectModeloTrabalho from '@/components/atoms/inputs/SelectModeloTrabalho';
import SelectRegimeContratual from '@/components/atoms/inputs/SelectRegimeContratual';
import SelectJornadaTrabalho from '@/components/atoms/inputs/SelectJornadaTrabalho';
import InputNomeFantasia from '@/components/atoms/inputs/InputNomeFantasia';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CardDetailVaga from '@/components/vaga/CardDetailVaga';
import { IVaga } from '@/interfaces/vaga';
import CardVaga from '@/components/vaga/CardVaga';
import VagaService from '@/services/VagaService';
import CandidaturaService from '@/services/CandidaturaService';
import { useAuthStore } from '@/store/auth';
import { toastError, toastSuccess } from '@/utils/toasts';
import { range } from 'lodash';
import TextSkeleton from '@/components/skeleton/TextSkeleton';

type QueueProps = {
  termo: string;
  empresa?: string;
  salario?: number;
  modelo_trabalho?: number;
  regime_contratual?: number;
  jornada_trabalho?: number;
};

const Page = () => {
  const [
    user,
    empresa,
    candidaturas,
    setCandidaturas,
    isAuthenticated,
    isCandidato,
    isEmpregador,
  ] = useAuthStore((state) => [
    state.user,
    state.empresa,
    state.candidaturas,
    state.setCandidaturas,
    state.isAuthenticated,
    state.isCandidato,
    state.isEmpregador,
  ]);
  const [vagas, setVagas] = useState<IVaga[]>(null);
  const [selectedVaga, setSelectedVaga] = useState<IVaga>(null);

  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(vagasSchema),
  });

  const { query } = useRouter();

  const handleSearch = async (query: QueueProps) => {
    try {
      const { results } = await VagaService.query(query);
      setSelectedVaga(results.length > 0 ? results[0] : null);
      setVagas(results);
    } catch (error) {
      toastError('Erro ao buscar vagas');
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

  useEffect(() => {
    (async () => {
      if (query) {
        await handleSearch({
          termo: query.q as string,
        });
      }
    })();
  }, [query]);

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
            />
            <SelectRegimeContratual
              register={register}
              error={errors.regime_contratual?.message}
              labelClassName={'text-white'}
            />
            <SelectJornadaTrabalho
              register={register}
              error={errors.jornada_trabalho?.message}
              labelClassName={'text-white'}
            />
          </div>
        </form>
      </div>
      <div className="mb-8 mt-4 space-y-2 container ">
        {isCandidato() && (
          <div>
            <div className="w-full">
              <div className="label">
                <span className="label-text">
                  Recomendações para o candidato (
                  <TextSkeleton>{vagas?.length}</TextSkeleton> vagas)
                </span>
              </div>
              <div className="w-full grid grid-cols-3 gap-8 bg-white p-4 rounded">
                {vagas ? (
                  vagas?.length > 0 ? (
                    vagas?.map((vaga, index) => (
                      <>
                        <CardVaga
                          key={vaga.id}
                          vaga={vaga}
                          isCandidato={true}
                          isOwner={false}
                          onClick={() => setSelectedVaga(vaga)}
                          selected={vaga.id === selectedVaga?.id}
                        />
                      </>
                    ))
                  ) : (
                    <div>Não há vagas recomendadas para você</div>
                  )
                ) : (
                  range(3).map((_, index) => (
                    <CardVaga
                      key={index}
                      vaga={null}
                      isCandidato={true}
                      isOwner={false}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          <div className="w-4/12">
            <div className="label">
              <span className="label-text">
                Resultado a partir da busca ({vagas?.length} vagas)
              </span>
            </div>
            <div className="w-full grid grid-cols-1 bg-white p-4 rounded">
              {vagas ? (
                vagas?.length > 0 ? (
                  vagas?.map((vaga, index) => (
                    <>
                      <CardVaga
                        key={vaga.id}
                        vaga={vaga}
                        isCandidato={true}
                        isOwner={false}
                        onClick={() => setSelectedVaga(vaga)}
                        selected={vaga.id === selectedVaga?.id}
                      />
                    </>
                  ))
                ) : (
                  <div className="py-8">
                    <p className="text-center">Não foram encontradas vagas</p>
                  </div>
                )
              ) : (
                <CardVaga
                  vaga={null}
                  isCandidato={true}
                  isOwner={false}
                  skeleton={3}
                />
              )}
            </div>
          </div>
          <div className="w-8/12 sticky">
            <div className="sticky top-0">
              <div className="label">
                <span className="label-text">Detalhes da vaga selecionada</span>
              </div>
              <div className="w-full grid grid-cols-1 gap-4  ">
                {selectedVaga ? (
                  <CardDetailVaga
                    vaga={selectedVaga}
                    isCandidato={isCandidato()}
                    action={() => handleCandidate(selectedVaga.id)}
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
      </div>
    </>
  );
};

Page.overrideLayout = '';

export default Page;
