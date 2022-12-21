import { classNames } from '@/utils';

type Props = {
  steps: string[];
  currentStep: number;
  changeStep?: any;
  className?: string;
};

const Stepper = ({ steps, currentStep, changeStep, className }: Props) => {
  return (
    <ul
      className={classNames(
        'steps steps-horizontal w-full step-after-white',
        className,
      )}
    >
      {steps.map((step, index) => (
        <li
          key={`step-${index}`}
          className={classNames(
            'step after:transition-colors after:duration-150 after:ease-linear before:transition-colors before:duration-150 before:ease-linear',
            currentStep >= index ? 'step-primary' : 'text-base-300',
          )}
        >
          <button onClick={() => changeStep(index)}>{step}</button>
        </li>
      ))}
    </ul>
  );
};

export default Stepper;
