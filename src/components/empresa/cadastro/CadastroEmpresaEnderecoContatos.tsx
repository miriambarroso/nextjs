import InputTelefone from '@/components/atoms/inputs/InputTelefone';
import InputEmail from '@/components/atoms/inputs/InputEmail';
import InputSite from '@/components/atoms/inputs/InputSite';
import InputCEP from '@/components/atoms/inputs/endereco/InputCEP';
import InputLogradouro from '@/components/atoms/inputs/endereco/InputLogradouro';
import InputNumero from '@/components/atoms/inputs/endereco/InputNumero';
import InputComplemento from '@/components/atoms/inputs/endereco/InputComplemento';
import InputBairro from '@/components/atoms/inputs/endereco/InputBairro';
import InputCidade from '@/components/atoms/inputs/endereco/InputCidade';
import DataListEstados from '@/components/atoms/inputs/endereco/DataListEstados';

type Props = { register: any; errors: any; editMode?: boolean };

const CadastroEmpresaEnderecoContatos = ({
  register,
  errors,
  editMode,
}: Props) => {
  return (
    <>
      {!editMode && (
        <>
          <InputTelefone
            label="Telefone Comercial"
            name="empresa_telefone"
            register={register}
            error={errors.empresa_telefone?.message}
            required
          />
          <InputEmail
            label="E-mail Comercial"
            name="empresa_email"
            register={register}
            error={errors.empresa_email?.message}
            required
          />
          <InputSite register={register} error={errors.site?.message} />
        </>
      )}

      <InputCEP register={register} error={errors.cep?.message} />
      <InputLogradouro register={register} error={errors.logradouro?.message} />
      <InputNumero register={register} error={errors.numero?.message} />
      <InputComplemento
        register={register}
        error={errors.complemento?.message}
      />
      <InputBairro register={register} error={errors.bairro?.message} />
      <InputCidade register={register} error={errors.cidade?.message} />
      <DataListEstados register={register} error={errors.estado?.message} />
    </>
  );
};

export default CadastroEmpresaEnderecoContatos;
