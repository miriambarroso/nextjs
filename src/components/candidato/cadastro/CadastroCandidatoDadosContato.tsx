import InputField from '@/components/atoms/InputField';
import { phoneMask } from '@/utils/masks';

type Props = { register: any; errors: any };

const CadastroCandidatoDadosContato = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register}
        placeholder="Ex: joao@anapolis.go.gov.br"
        error={errors.email?.message}
        options={{
          required: true,
        }}
      />
      <InputField
        label="Celular"
        name="telefone"
        register={register}
        placeholder="Ex: (00) 00000-0000"
        error={errors.telefone?.message}
        type="phone"
        options={{
          required: true,
          onChange: phoneMask.onChange,
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

export default CadastroCandidatoDadosContato;
