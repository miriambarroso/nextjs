import InputNome from '@/components/atoms/inputs/InputNome';
import InputDate from '@/components/atoms/inputs/InputDate';
import InputCPF from '@/components/atoms/inputs/InputCPF';
import InputAtuacao from '@/components/atoms/inputs/InputAtuacao';
import InputCargo from '@/components/atoms/inputs/InputCargo';
import InputTelefone from '@/components/atoms/inputs/InputTelefone';
import InputEmail from '@/components/atoms/inputs/InputEmail';
import InputSenha from '@/components/atoms/inputs/InputSenha';

type Props = { register: any; errors: any; editMode?: boolean };

const CadastroEmpresaDadosPessoais = ({
  register,
  errors,
  editMode,
}: Props) => {
  return (
    <>
      <InputNome
        register={register}
        error={errors.nome?.message}
        required={true}
      />
      <InputDate
        register={register}
        error={errors.data_nascimento?.message}
        required={true}
      />

      <InputCPF
        register={register}
        error={errors.cpf?.message}
        required={true}
      />
      <InputAtuacao register={register} error={errors.atuacao?.message} />
      <InputCargo register={register} error={errors.cargo?.message} />

      <InputTelefone
        label="Telefone Pessoal"
        register={register}
        error={errors.telefone?.message}
        required={true}
      />
      <InputEmail
        label="E-mail Pessoal"
        register={register}
        required={true}
        error={errors.email?.message}
      />
      {!editMode && (
        <>
          <InputSenha
            label="Crie uma senha"
            error={errors.password?.message}
            register={register}
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
      )}
    </>
  );
};

export default CadastroEmpresaDadosPessoais;
