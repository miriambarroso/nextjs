import { ReactNode } from 'react';
import { BiError } from "react-icons/bi";


type Props = {
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
};

const CardNotification = ({ subtitle, title, children }: Props) => {
  return (
    <div className="max-w-3xl mx-auto bg-white py-8 px-8 my-4 lg:my-20 text-base-content rounded">
      <div className="d-flex lg:flex-row items-center"
          // @ts-ignore
           style={{ display: "flex", align_items: "center"}}
      >
        <BiError className="text-6xl text-error m-1 " />
        <div className={"flex-col"}>
          <h1 className="text-2xl font-noto-sans font-semibold ">{title}</h1>
          {subtitle}
        </div>
      </div>
      <div className="divider divider-horizontal my-4"></div>
      <div> {children} </div>
    </div>
  );
};

export default CardNotification;
