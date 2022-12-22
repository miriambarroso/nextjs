import { classNames } from '@/utils';
import { BiHealth } from 'react-icons/bi';

type Props = {
  label: string;
  name: string;
  register: any;
  placeholder?: string;
  options?: any;
  className?: string;
  error?: any;
};

const TextAreaField = ({
  label,
  name,
  register,
  placeholder,
  options,
  className,
  error,
}: Props) => {
  return (
    <div className={classNames('form-control', className)}>
      <label className="label">
        <span className="label-text">
          {label}{' '}
          {options?.required && (
            <BiHealth
              className={classNames(
                error ? 'text-error' : 'text-base-200',
                ' inline-block text-xs',
              )}
            />
          )}
        </span>
      </label>
      <textarea
        {...register(name, options)}
        placeholder={placeholder}
        className={classNames('input h-32', error && 'input-error')}
      />
      <label className={classNames(!error && 'hidden', 'label')}>
        <span className="label-text-alt text-error">{error}</span>
      </label>
    </div>
  );
};

export default TextAreaField;
