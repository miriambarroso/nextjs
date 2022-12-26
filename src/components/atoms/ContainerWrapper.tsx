import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ContainerWrapper = ({ children }: Props) => {
  return <div className="py-8 px-8 my-4 lg:my-20">{children}</div>;
};

export default ContainerWrapper;
