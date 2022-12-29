import DataListField from '@/components/atoms/DataListField';
import { EstadosChoices } from '@/utils/choices';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const DataListEstados = ({
  register,
  error,
  required = false,
  label = 'Estado',
  name = 'estado',
}: Props) => {
  return (
    <>
      <DataListField
        label={label}
        name={name}
        placeholder="Ex: SP"
        register={register}
        error={error}
        inputProps={{
          maxLength: 2,
        }}
        options={{
          required: required,
        }}
        choices={EstadosChoices.choices}
      />
    </>
  );
};

export default DataListEstados;
