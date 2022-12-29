import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label: string;
  name: string;
  maxDate?: Date;
  minDate?: Date;
  options?: any;
};

const InputDate = ({
  register,
  error,
  label,
  name,
  required = false,
  maxDate = new Date(),
  minDate = new Date(1900, 0, 1),
  options = {},
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        error={error}
        type="date"
        options={{
          required: required,
        }}
        inputProps={{
          max: maxDate.toISOString().split('T')[0],
          min: minDate.toISOString().split('T')[0],
          ...options,
        }}
      />
    </>
  );
};

export default InputDate;
