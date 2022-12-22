import React, { FunctionComponent, ReactNode } from 'react';
import CardFormWrapper from '@/components/atoms/CardFormWrapper';

type Props = {
  onSubmit: any;
  children: ReactNode;
  component: FunctionComponent;
  register: any;
  errors: any;
  title: string;
  watch?: any;
  data?: any;
};

const BasicForm = ({
  onSubmit,
  component,
  children,
  register,
  errors,
  title,
  watch,
  data,
}: Props) => {
  const DynamicComponent: FunctionComponent<{}> = component;

  DynamicComponent.defaultProps = {
    register,
    errors,
    watch,
    data,
  };

  return (
    <>
      <CardFormWrapper title={title}>
        <form onSubmit={onSubmit}>
          <DynamicComponent />
          <div className="flex space-x-4 justify-end">{children}</div>
        </form>
      </CardFormWrapper>
    </>
  );
};

export default BasicForm;
