import SelectField from '@/components/atoms/SelectField';
import { IChoice, ModeloTrabalhoChoices } from '@/utils/choices';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
  choices?: IChoice[];
};

const SelectModeloTrabalho = ({
  register,
  error,
  required = false,
  label = 'Modelo de trabalho',
  name = 'modelo_trabalho',
  choices = [],
}: Props) => {
  const modeloTrabalhoChoices = [
    {
      label: 'Selecione o modelo de trabalho',
      value: '',
      selected: true,
      disabled: true,
    },
    ...ModeloTrabalhoChoices.choices,
  ];

  return (
    <>
      <SelectField
        label={label}
        name={name}
        register={register}
        error={error}
        choices={choices?.length > 0 ? choices : modeloTrabalhoChoices}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default SelectModeloTrabalho;
