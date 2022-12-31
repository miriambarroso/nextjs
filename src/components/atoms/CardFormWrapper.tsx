import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: ReactNode;
};

const CardFormWrapper = ({ children, title, subtitle }: Props) => {
  return (
    <div className="max-w-3xl mx-auto bg-white py-8 px-8 my-4 lg:my-20 text-base-content rounded">
      <div className="flex items-baseline">
        <h1 className="text-2xl font-noto-sans font-semibold">{title}</h1>
        {subtitle}
      </div>
      <div className="divider divider-horizontal my-4"></div>
      {children}
    </div>
  );
};

export default CardFormWrapper;
