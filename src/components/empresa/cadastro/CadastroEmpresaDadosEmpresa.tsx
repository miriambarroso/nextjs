import InputField from '@/components/atoms/InputField';
import { cnpjMask, numberMask } from '@/utils/masks';
import TextAreaField from '@/components/atoms/TextAreaField';

type Props = { register: any; errors: any };

const CadastroEmpresaDadosEmpresa = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="CNPJ"
        name="cnpj"
        register={register}
        placeholder="Ex: 00.000.000/0000-00"
        error={errors.cnpj?.message}
        options={{
          required: true,
          onChange: cnpjMask.onChange,
        }}
      />
      <InputField
        label="Razão Social"
        name="razao_social"
        register={register}
        placeholder="Ex: Empresa de Tecnologia LTDA"
        error={errors.razao_social?.message}
        options={{
          required: true,
        }}
      />
      <InputField
        label="Nome Fantasia"
        name="nome_fantasia"
        register={register}
        placeholder="Ex: Empresa de Tecnologia"
        error={errors.nome_fantasia?.message}
        options={{
          required: true,
        }}
      />
      <InputField
        label="Ramo de Atividade"
        name="ramo_atividade"
        register={register}
        placeholder="Ex: Tecnologia"
        error={errors.ramo_atividade?.message}
        options={{
          required: true,
        }}
      />
      <InputField
        label="Número de Funcionários"
        name="numero_funcionarios"
        register={register}
        placeholder="Ex: 100"
        options={{
          onChange: numberMask.onChange,
        }}
        error={errors.numero_funcionarios?.message}
      />
      <TextAreaField
        label={'Descrição da Empresa'}
        name={'descricao'}
        register={register}
        placeholder={'Descreva as atividade exercidas pela empresa'}
      />
    </>
  );
};

export default CadastroEmpresaDadosEmpresa;
