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
import { cepMask } from '@/utils/masks';
import useEffectTimeout from '@/hooks/useEffectTimeout';
import { toastError } from '@/utils/toasts';
import { useState } from 'react';

type Props = { register: any; errors: any; editMode?: boolean; setValue: any };

const CadastroEmpresaEnderecoContatos = ({
  register,
  errors,
  editMode,
  setValue,
}: Props) => {
  const [cep, setCep] = useState('');

  const lookUpCEP = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.erro) {
      toastError('CEP não encontrado!');
      return;
    }
    return data;
  };

  useEffectTimeout(
    () => {
      if (cep.length === 9) {
        lookUpCEP(cep).then((data) => {
          if (data) {
            setValue('logradouro', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('complemento', data.complemento);
            setValue('cidade', data.localidade);
            setValue('estado', data.uf);
          }
        });
      }
    },
    1000,
    [cep],
  );

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

      <InputCEP
        register={register}
        error={errors.cep?.message}
        options={{
          required: true,
          onChange: (e) => {
            setCep(e.target.value);
            return cepMask.onChange(e);
          },
        }}
      />
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
