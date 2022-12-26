import { createElement, CSSProperties, ReactNode } from 'react';
import { classNames } from '@/utils';

type Props = {
  className?: string;
  as?: 'p' | 'span' | 'div';
  style?: CSSProperties;
  children?: ReactNode;
};
const TextSkeleton = ({ className, style, children, as = 'div' }: Props) => {
  const element = createElement(as, {
    className: classNames(
      'rounded animate-pulse inline-block',
      className ?? 'h-4 w-1/2 bg-base-100',
    ),
    style: style,
  });
  return <>{children ?? element}</>;
};

export default TextSkeleton;
