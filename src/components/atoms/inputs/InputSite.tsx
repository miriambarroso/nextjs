import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputSite = ({
  register,
  error,
  required = false,
  label = 'Site',
  name = 'site',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        placeholder="Ex: anapolis.go.gov.br"
        register={register}
        error={error}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputSite;
