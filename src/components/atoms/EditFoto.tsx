import Image from 'next/image';
import { classNames } from '@/utils';
import { BiTrash } from 'react-icons/bi';
import { useEffect, useState } from 'react';

type Props = { watch; onSubmit; onDelete; register; error };

const EditFoto = ({ onDelete, onSubmit, watch, register, error }: Props) => {
  const { foto } = watch();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(foto ? !foto?.length : true);
  }, [foto]);

  return (
    <>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Foto</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="avatar">
            <div className="w-40 rounded-full relative">
              <Image
                src={foto?.length ? foto : 'https://placeimg.com/400/225/arch'}
                fill
                className="object-cover"
                alt="Logo da Empresa"
              />
            </div>
          </div>
          <div className="w-60">
            <input
              {...register}
              type="file"
              accept="image/*"
              className={classNames(
                'file-input w-full',
                error && 'file-input-error',
              )}
              onChange={onSubmit}
            />
            <button
              type="button"
              disabled={isDisabled}
              onClick={onDelete}
              className="btn btn-error space-x-2 w-full"
            >
              <BiTrash className="text-lg" /> Excluir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFoto;
