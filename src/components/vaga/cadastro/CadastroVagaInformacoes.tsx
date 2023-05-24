import InputField from '@/components/atoms/InputField';
import SelectField from '@/components/atoms/SelectField';
import SelectJornadaTrabalho from '@/components/atoms/inputs/SelectJornadaTrabalho';
import SelectModeloTrabalho from '@/components/atoms/inputs/SelectModeloTrabalho';
import { SexoChoicesBoth } from '@/utils/choices';
import ToggleField from "@/components/atoms/ToggleField";

type Props = {
  register: any;
  errors: any;
};

const CadastroVagaInformacoes = ({ register, errors }: Props) => {
  return (
    <>
      <SelectJornadaTrabalho
        label={'Jornada de Trabalho'}
        name={'jornada_trabalho'}
        register={register}
        required={true}
        error={errors.jornada_trabalho?.message}
      />
      <SelectModeloTrabalho
        label="Modelo de Trabalho"
        name="modelo_trabalho"
        register={register}
        error={errors.modelo_trabalho?.message}
        required={true}
      />
      <SelectField
        register={register}
        choices={SexoChoicesBoth.choices}
        label="Genêro"
        name="sexo"
      />
      <div className="form-control flex-row justify-between gap-x-4">
        <div className="w-full">
          <InputField
            label={'Idade mínima'}
            name={'idade_minima'}
            placeholder={'Ex: 18'}
            type="number"
            inputProps={{ min: 14, max: 200 }}
            register={register}
            error={errors.idade_minima?.message}
          />
        </div>
        <div className="w-full">
          <InputField
            label={'Idade máxima'}
            name={'idade_maxima'}
            placeholder={'Ex: 65'}
            type="number"
            inputProps={{ min: 14, max: 200 }}
            register={register}
            error={errors.idade_maxima?.message}
          />
        </div>
      </div>
      <InputField
        label={'Número de vagas'}
        name={'quantidade_vagas'}
        register={register}
        error={errors.quantidade_vagas?.message}
        placeholder={'Ex: 1'}
        type="number"
        inputProps={{ min: 1 }}
        options={{
          required: true,
        }}
      />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Vaga está ativa?</span>
        </label>
        <ToggleField
          label={'Está ativa?'}
          name={'esta_ativo'}
          register={register}
          options={{
            default: true,
          }}
        />
      </div>
    </>
  );
};

export default CadastroVagaInformacoes;
