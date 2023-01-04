import { useEffect, useState } from 'react';

type WidthBreakpoints = {
  [key: number]: string;
};

class Breakpoint {
  private readonly _widthBreakpoints: WidthBreakpoints;

  constructor(breakpoints: WidthBreakpoints) {
    this._widthBreakpoints = breakpoints || this._widthBreakpoints;
  }

  get breakpoints() {
    return this._widthBreakpoints;
  }

  getBreakpoint(width: number) {
    return this._widthBreakpoints[width];
  }

  getBreakpointByLabel(label: string) {
    return Object.keys(this._widthBreakpoints).find(
      (key) => this._widthBreakpoints[key] === label,
    );
  }
}

const baseBreakpoints = {
  640: 'sm',
  768: 'md',
  1024: 'lg',
  1280: 'xl',
  1536: '2xl',
};

const useBreakpoint = (breakpoints: WidthBreakpoints = baseBreakpoints) => {
  const [breakpoint, setBreakpoint] = useState<string>('');
  const breakPointClass = new Breakpoint(breakpoints);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const isBreakpoint = (label: string) => {
    const width = breakPointClass.getBreakpointByLabel(label);
    return windowSize.width <= Number(width);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    for (const width in breakPointClass?.breakpoints) {
      if (windowSize.width < width) {
        setBreakpoint(breakPointClass.getBreakpoint(Number(width)));
        break;
      }
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return { breakpoint, baseBreakpoints, isBreakpoint };
};

export default useBreakpoint;
