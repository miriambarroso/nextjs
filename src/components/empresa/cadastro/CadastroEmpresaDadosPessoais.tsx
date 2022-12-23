import InputField from '@/components/atoms/InputField';
import { cpfMask } from '@/utils/masks';

type Props = { register: any; errors: any };

const CadastroEmpresaDadosPessoais = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Nome Completo"
        name="nome"
        register={register}
        placeholder="Ex: João da Silva"
        error={errors.nome?.message}
        options={{
          required: true,
        }}
      />
      <InputField
        label="Data de Nascimento"
        name="data_nascimento"
        register={register}
        error={errors.data_nascimento?.message}
        type="date"
        options={{
          required: true,
        }}
      />

      <InputField
        label="CPF"
        name="cpf"
        register={register}
        placeholder="Ex: 000.000.000-00"
        error={errors.cpf?.message}
        options={{ required: true, onChange: cpfMask.onChange }}
      />
      <InputField
        label="Área de Atuação"
        name="atuacao"
        placeholder="Ex: Departamento Pessoal"
        register={register}
      />
      <InputField
        label="Cargo"
        name="cargo"
        placeholder="Ex: Analista de Sistemas"
        register={register}
      />
      <InputField
        label="E-mail Corporativo"
        name="email"
        register={register}
        placeholder={'Ex: joao@anapolis.go.gov.br'}
        error={errors.email?.message}
        type="email"
        options={{
          required: true,
        }}
      />
      <InputField
        label="Crie uma senha"
        name="password"
        register={register}
        placeholder="********"
        error={errors.password?.message}
        type="password"
        options={{
          required: true,
        }}
      />
      <div className="prose text-sm text-base-content opacity-50">
        <ul>
          <li>Minimo de 8 caracteres</li>
          <li>Minimo de 1 caracter especial</li>
          <li>Letras MAIÚSCULAS</li>
          <li>Letras minúsculas</li>
        </ul>
      </div>
      <InputField
        label="Repita sua senha"
        name="confirm_password"
        register={register}
        placeholder="********"
        error={errors.confirm_password?.message}
        type="password"
        options={{
          required: true,
        }}
      />
    </>
  );
};

export default CadastroEmpresaDadosPessoais;
