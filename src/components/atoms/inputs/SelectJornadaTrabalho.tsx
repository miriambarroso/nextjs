import SelectField from '@/components/atoms/SelectField';
import { IChoice, JornadaTrabalhoChoices } from '@/utils/choices';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
  choices?: IChoice[];
};

const SelectJornadaTrabalho = ({
  register,
  error,
  required = false,
  label = 'Jornada de trabalho',
  name = 'jornada_trabalho',
  choices,
}: Props) => {
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
      <SelectField
        label={label}
        name={name}
        placeholder="Ex: 40 horas semanais"
        register={register}
        error={error}
        choices={choices?.length > 0 ? choices : jornadaTrabalhoChoices}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default SelectJornadaTrabalho;
