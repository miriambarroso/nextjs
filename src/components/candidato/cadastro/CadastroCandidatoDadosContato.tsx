import InputEmail from '@/components/atoms/inputs/InputEmail';
import InputTelefone from '@/components/atoms/inputs/InputTelefone';
import InputSenha from '@/components/atoms/inputs/InputSenha';

type Props = { register: any; errors: any };

const CadastroCandidatoDadosContato = ({ register, errors }: Props) => {
  return (
    <>
      <InputEmail register={register} error={errors.email?.message} required />
      <InputTelefone
        label="Celular"
        register={register}
        error={errors.telefone?.message}
        required
      />
      <InputSenha
        label="Crie uma senha"
        register={register}
        error={errors.password?.message}
        required
      />
      <div className="prose text-sm text-base-content opacity-50">
        <ul>
          <li>Minimo de 8 caracteres</li>
          <li>Minimo de 1 caracter especial</li>
          <li>Letras MAIÚSCULAS</li>
          <li>Letras minúsculas</li>
        </ul>
      </div>
      <InputSenha
        label="Repita sua senha"
        name="confirm_password"
        register={register}
        error={errors.confirm_password?.message}
        required
      />
    </>
  );
};

export default CadastroCandidatoDadosContato;
