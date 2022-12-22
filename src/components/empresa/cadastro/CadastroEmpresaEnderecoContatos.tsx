import InputField from '@/components/atoms/InputField';
import { cepMask, phoneMask } from '@/utils/masks';

type Props = { register: any; errors: any };

const CadastroEmpresaEnderecoContatos = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Telefone Comercial"
        name="telefone"
        register={register}
        placeholder="(00) 0000-0000"
        error={errors.telefone?.message}
        options={{
          required: true,
          onChange: phoneMask.onChange,
        }}
      />
      <InputField
        label="Site"
        name="site"
        placeholder="example.com"
        register={register}
        error={errors.site?.message}
      />
      <InputField
        label="CEP"
        name="cep"
        placeholder="00000-000"
        register={register}
        error={errors.cep?.message}
        options={{
          onChange: cepMask.onChange,
        }}
      />
      <InputField
        label="Logradouro"
        name="logradouro"
        placeholder="Rua, Avenida, etc"
        register={register}
        error={errors.logradouro?.message}
      />
      <InputField
        label="Número"
        name="numero"
        placeholder="Ex: 100"
        register={register}
        error={errors.numero?.message}
      />
      <InputField
        label="Complemento"
        name="complemento"
        placeholder="Ex: Casa, Apartamento, etc"
        register={register}
        error={errors.complemento?.message}
      />
      <InputField
        label="Bairro"
        name="bairro"
        placeholder="Ex: Centro"
        register={register}
        error={errors.bairro?.message}
      />
      <InputField
        label="Cidade"
        name="cidade"
        placeholder="Ex: São Paulo"
        register={register}
        error={errors.cidade?.message}
      />
      <InputField
        label="Estado"
        name="estado"
        placeholder="Ex: SP"
        register={register}
        error={errors.estado?.message}
      />
    </>
  );
};

export default CadastroEmpresaEnderecoContatos;
