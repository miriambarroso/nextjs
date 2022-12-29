import InputField from '@/components/atoms/InputField';
import { numberMask } from '@/utils/masks';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputDuracaoHoras = ({
  register,
  error,
  required = false,
  label = 'Tempo de duração',
  name = 'duracao_horas',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder={'Ex: 2.000 horas'}
        options={{
          required: required,
          onChange: numberMask.onChange,
        }}
        type="number"
        error={error}
      />
    </>
  );
};

export default InputDuracaoHoras;
