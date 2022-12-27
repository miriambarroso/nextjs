import { useState } from 'react';

type Return = {
  open: boolean;
  toggle: () => void;
};
const useModal = (): Return => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    console.log('hdadhwiad', open);
    setOpen(!open);
  };

  return {
    open,
    toggle,
  };
};

export default useModal;
