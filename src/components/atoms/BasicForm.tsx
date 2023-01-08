import React, { FunctionComponent, ReactNode, useRef } from 'react';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  onSubmit: (recaptcha: string) => void;
  children: ReactNode;
  component: FunctionComponent;
  register: any;
  errors: any;
  title: string;
  watch?: any;
  trigger?: any;
  data?: any;
  setValue?: any;
};

const BasicForm = ({
  onSubmit,
  component,
  children,
  register,
  errors,
  title,
  watch,
  trigger,
  data,
  setValue,
}: Props) => {
  const recaptchaRef = useRef(null);
  const DynamicComponent: FunctionComponent<{}> = component;

  DynamicComponent.defaultProps = {
    register,
    errors,
    watch,
    data,
    trigger,
    setValue,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recaptchaValue = await recaptchaRef.current.executeAsync();
    onSubmit(recaptchaValue);
    recaptchaRef.current.reset();
  };

  return (
    <>
      <CardFormWrapper title={title}>
        <form onSubmit={handleSubmit}>
          <DynamicComponent />
          <div className="flex flex-wrap justify-between mt-4">
            <ReCAPTCHA
              badge="inline"
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
              ref={recaptchaRef}
            />
            <div className={'ml-auto space-x-4'}>{children}</div>
          </div>
        </form>
      </CardFormWrapper>
    </>
  );
};

export default BasicForm;
