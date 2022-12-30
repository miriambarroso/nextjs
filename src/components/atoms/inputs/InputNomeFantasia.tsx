import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required: boolean;
  label?: string;
  name?: string;
  className?: string;
  labelClassName?: string;
};

const InputNomeFantasia = ({
  register,
  error,
  required,
  label = 'Nome Fantasia',
  name = 'nome_fantasia',
  className,
  labelClassName,
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder="Ex: Empresa de Tecnologia"
        error={error}
        className={className}
        labelClassName={labelClassName}
        options={{
          required: required,
        }}
      />
    </>
  );
};

export default InputNomeFantasia;
