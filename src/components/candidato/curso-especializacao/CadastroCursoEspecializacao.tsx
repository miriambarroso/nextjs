import InputField from '@/components/atoms/InputField';
import { numberMask } from '@/utils/masks';
import SelectField from '@/components/atoms/SelectField';
import { FormacaoNivelChoices } from '@/utils/choices';

type Props = {
  register: any;
  errors: any;
};

const CadastroCursoEspecializacao = ({ register, errors }: Props) => {
  const nivelFormacaoChoices = [
    {
      value: '',
      label: 'Selecione o nível de formação',
      disabled: true,
      selected: true,
    },
    ...FormacaoNivelChoices.choices,
  ];
  return (
    <>
      <InputField
        label="Instituição de ensino"
        name="instituicao"
        register={register}
        placeholder="Ex: Instituto Federal de Educação, Ciência e Tecnologia de Goiás"
        options={{
          required: true,
        }}
        error={errors.instituicao?.message}
      />
      <InputField
        label="Curso"
        name="curso"
        register={register}
        placeholder="Ex: Análise e Desenvolvimento de Sistemas"
        options={{
          required: true,
        }}
        error={errors.curso?.message}
      />
      <SelectField
        label="Nível de formação"
        name="nivel"
        register={register}
        placeholder="Ex: Superior"
        options={{
          required: true,
        }}
        choices={nivelFormacaoChoices}
        error={errors.nivel?.message}
      />
      <InputField
        label="Data de conclusão"
        name="data_conclusao"
        register={register}
        placeholder="Ex: 01/01/2024"
        options={{
          required: true,
        }}
        type="date"
        error={errors.data_conclusao?.message}
      />
      <InputField
        label={'Tempo de duração'}
        name={'duracao_horas'}
        register={register}
        placeholder={'Ex: 2.000 horas'}
        options={{
          required: true,
          onChange: numberMask.onChange,
        }}
        type="number"
        error={errors.duracao_horas?.message}
      />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Certificado</span>
        </label>
        <input
          type="file"
          {...register('certificado')}
          className="file-input w-full "
        />
      </div>
    </>
  );
};

export default CadastroCursoEspecializacao;
