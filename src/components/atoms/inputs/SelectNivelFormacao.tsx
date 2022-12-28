import SelectField from '@/components/atoms/SelectField';
import { FormacaoNivelChoices, IChoice } from '@/utils/choices';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
  choices?: IChoice[];
};

const SelectNivelFormacao = ({
  register,
  error,
  required = false,
  label = 'Nível de formação',
  name = 'nivel',
  choices,
}: Props) => {
  const nivelFormacaoChoices = [
    {
      label: 'Selecione o nível de formação',
      value: '',
      selected: true,
      disabled: true,
    },
    ...FormacaoNivelChoices.choices,
  ];

  return (
    <>
      <SelectField
        label={label}
        name={name}
        register={register}
        placeholder="Ex: Superior"
        options={{
          required: required,
        }}
        choices={choices?.length ? choices : nivelFormacaoChoices}
        error={error}
      />
    </>
  );
};

export default SelectNivelFormacao;
