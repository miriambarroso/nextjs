import TextAreaField from '@/components/atoms/TextAreaField';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const TextAreaDescricao = ({
  register,
  error,
  required = false,
  label = 'Descrição da Empresa',
  name = 'descricao',
}: Props) => {
  return (
    <>
      <TextAreaField
        label={label}
        name={name}
        register={register}
        error={error}
        options={{
          required: required,
        }}
        placeholder={'Descreva as atividade exercidas pela empresa'}
      />
    </>
  );
};

export default TextAreaDescricao;
