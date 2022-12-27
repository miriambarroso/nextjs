import { useState } from 'react';

type Return = {
  open: boolean;
  toggle: () => void;
};
const useModal = (): Return => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen(!open);

  return {
    open,
    toggle,
  };
};

export default useModal;
