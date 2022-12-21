import { classNames } from '@/utils';
import { BiHealth } from 'react-icons/bi';

type Props = {
  label: string;
  name: string;
  register: any;
  placeholder?: string;
  options?: any;
  type?: string;
  className?: string;
  error?: any;
};

const InputField = ({
  label,
  name,
  register,
  placeholder,
  options,
  type = 'text',
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
      <input
        {...register(name, options)}
        type={type}
        placeholder={placeholder}
        className={classNames('input', error && 'input-error')}
      />
      <label className={classNames(!error && 'hidden', 'label')}>
        <span className="label-text-alt text-error">{error}</span>
      </label>
    </div>
  );
};

export default InputField;
