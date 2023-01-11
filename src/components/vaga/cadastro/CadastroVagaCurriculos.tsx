import { useEffect } from 'react';
import InputFileField from '@/components/atoms/InputFileField';

type Props = { register: any; errors: any; watch: any };

const CadastroVagaCurriculos = ({ register, errors, watch }: Props) => {
  const { curriculos } = watch();

  useEffect(() => {
    if (curriculos && curriculos.length > 0) {
      console.log(curriculos);
    }
  }, [curriculos]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table rounded-none w-full">
          <thead>
            <tr>
              <th></th>
              <th>Arquivo</th>
              <th>Tamanho</th>
            </tr>
          </thead>
          <tbody>
            {curriculos?.length ? (
              Array.from(curriculos).map((curriculo: File, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{curriculo?.name}</td>
                  <td>{(curriculo.size / 1000).toFixed(2)}KB</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  Selecione os currículos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <InputFileField
        label={'Curriculos'}
        name={'curriculos'}
        register={register}
        inputProps={{
          multiple: true,
          accept: '.pdf',
        }}
        error={errors.curriculos?.message}
      />
    </>
  );
};

export default CadastroVagaCurriculos;
