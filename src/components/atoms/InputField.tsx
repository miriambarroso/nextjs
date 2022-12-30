import { classNames } from '@/utils';
import { BiHealth } from 'react-icons/bi';

type Props = {
  label: string;
  name: string;
  register: any;
  error?: any;
  className?: string;
  labelClassName?: string;
  type?: string;
  options?: any;
  placeholder?: string;
  inputProps?: any;
};

const InputField = ({
  label,
  name,
  register,
  placeholder,
  options,
  type = 'text',
  className,
  labelClassName,
  error,
  inputProps,
}: Props) => {
  return (
    <div className={classNames('form-control', className)}>
      <label className="label">
        <span className={classNames('label-text', labelClassName)}>
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
        {...inputProps}
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
