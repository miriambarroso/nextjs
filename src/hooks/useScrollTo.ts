import { useRef } from 'react';

const useScrollTo = () => {
  const scrollRef = useRef(null);

  const triggerScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return { scrollRef, triggerScroll };
};

export default useScrollTo;
