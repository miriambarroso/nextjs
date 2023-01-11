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
  handlers?: any;
  props?: any;
};

const BasicForm = ({
  props,
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
  handlers,
}: Props) => {
  const recaptchaRef = useRef(null);
  const DynamicComponent: FunctionComponent<{}> = component;

  DynamicComponent.defaultProps = {
    ...props,
    register,
    errors,
    watch,
    data,
    trigger,
    setValue,
    handlers,
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
