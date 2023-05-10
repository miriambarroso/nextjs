import Image from 'next/image';
import { classNames } from '@/utils';
import { BiLinkExternal, BiTrash } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import PDFViewer from '@/components/PDFViewer';

type Props = {
  visualize?: boolean;
  watch;
  onSubmit;
  onDelete;
  register;
  error;
  watchField: string;
};

const InputUploadPDF = ({
  visualize = true,
  onDelete,
  onSubmit,
  watch,
  register,
  error,
  watchField,
}: Props) => {
  return (
    <>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Currículo</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          {visualize ? (
            <div className="w-84">
              {watch(watchField) ? (
                <PDFViewer
                  pdf={watch(watchField)}
                  iframeProps={{
                    className: 'w-full overflow-y-hidden',
                  }}
                />
              ) : (
                <p>Faça upload de um currículo.</p>
              )}
            </div>
          ) : null}

          <div className="w-60">
            <input
              {...register}
              type="file"
              accept="application/pdf"
              className={classNames(
                'file-input w-full',
                error && 'file-input-error',
              )}
              onChange={onSubmit}
            />
            <div className="flex gap-2">
              <a
                href={watch(watchField)}
                target="_blank"
                rel="noreferrer"
                className={classNames(
                  watch(watchField) ? 'btn-primary' : 'btn-disabled',
                  'btn space-x-2 flex-1',
                )}
              >
                <BiLinkExternal className="text-lg" /> Abrir
              </a>
              <button
                type="button"
                disabled={!watch(watchField)}
                onClick={onDelete}
                className="btn btn-error space-x-2"
              >
                <BiTrash className="text-lg flex-1" /> Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputUploadPDF;
