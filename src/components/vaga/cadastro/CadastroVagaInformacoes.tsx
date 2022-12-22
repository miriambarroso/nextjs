import InputField from '@/components/atoms/InputField';
import SelectField, { ChoiceProp } from '@/components/atoms/SelectField';

type Props = {
  register: any;
  errors: any;
};

const CadastroVagaInformacoes = ({ register, errors }: Props) => {
  const sexoChoices = [
    { value: '4', label: 'Ambos' },
    { value: '1', label: 'Feminino' },
    { value: '2', label: 'Masculino' },
  ] as ChoiceProp[];

  return (
    <>
      <InputField
        label={'Jornada de Trabalho'}
        name={'jornada_trabalho'}
        register={register}
        placeholder={'Ex: 40 horas semanais'}
        error={errors.jornada_trabalho?.message}
      />
      <InputField
        label="Modelo de Trabalho"
        name="modelo_trabalho"
        placeholder={'Ex: Remoto'}
        register={register}
        error={errors.modelo_trabalho?.message}
      />
      <SelectField
        register={register}
        choices={sexoChoices}
        label="Genêro"
        name="sexo"
      />
      <div className="form-control flex-row justify-between gap-x-4">
        <div className="w-full">
          <InputField
            label={'Idade minima'}
            name={'idade_minima'}
            placeholder={'Ex: 18'}
            type="number"
            inputProps={{ min: 0, max: 200 }}
            register={register}
            error={errors.idade_minima?.message}
          />
        </div>
        <div className="w-full">
          <InputField
            label={'Idade máxima'}
            name={'idade_maxima'}
            placeholder={'Ex: 60'}
            type="number"
            inputProps={{ min: 0, max: 200 }}
            register={register}
            error={errors.idade_minima?.message}
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
      />
    </>
  );
};

export default CadastroVagaInformacoes;
