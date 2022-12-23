import InputField from '@/components/atoms/InputField';
import { currencyMask } from '@/utils/masks';
import { IObjetivoProfissional } from '@/components/candidato/objetivo-profissional/schema';
import SelectField from '@/components/atoms/SelectField';
import {
  JornadaTrabalhoChoices,
  ModeloTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';

type Props = {
  register: any;
  errors: any;
  data?: IObjetivoProfissional;
};

const CadastroObjetivoProfissional = ({ register, errors, data }: Props) => {
  const modeloTrabalhoChoices = [
    {
      label: 'Selecione o modelo de trabalho',
      value: '',
      selected: true,
      disabled: true,
    },
    ...ModeloTrabalhoChoices.choices,
  ];

  const regimeContratualChoices = [
    {
      label: 'Selecione o regime contratual',
      value: '',
      selected: true,
      disabled: true,
    },
    ...RegimeContratualChoices.choices,
  ];

  const jornadaTrabalhoChoices = [
    {
      label: 'Selecione o jornada de trabalho',
      value: '',
      selected: true,
      disabled: true,
    },
    ...JornadaTrabalhoChoices.choices,
  ];

  return (
    <>
      <InputField
        label="Cargo desejado"
        name="cargo"
        register={register}
        placeholder="Ex: Analista de Sistemas"
        error={errors.cargo?.message}
      />
      <InputField
        label="Pretensão salarial"
        name="salario"
        placeholder="Ex: 2.000,00"
        register={register}
        options={{
          onChange: currencyMask.onChange,
        }}
        error={errors.salario?.message}
      />

      <SelectField
        label="Modelo de trabalho"
        name={'modelo_trabalho'}
        register={register}
        error={errors.modelo_trabalho?.message}
        choices={modeloTrabalhoChoices}
      />
      <SelectField
        label="Regime de contratação"
        name="regime_contratual"
        register={register}
        error={errors.regime_contratual?.message}
        choices={regimeContratualChoices}
      />
      <SelectField
        label="Jornada de trabalho"
        name="jornada_trabalho"
        placeholder="Ex: 40 horas semanais"
        register={register}
        error={errors.jornada_trabalho?.message}
        choices={jornadaTrabalhoChoices}
      />
    </>
  );
};

export default CadastroObjetivoProfissional;
