import { createElement, CSSProperties, ReactNode } from 'react';
import { classNames } from '@/utils';
import { range } from 'lodash';

type Props = {
  className?: string;
  as?: string;
  style?: CSSProperties;
  children?: ReactNode;
  rows?: number;
};
const TextSkeleton = ({
  className,
  style,
  children,
  as = 'div',
  rows = 1,
}: Props) => {
  return (
    <>
      {children ??
        range(rows).map((_, index) =>
          createElement(as, {
            className: classNames(
              'rounded animate-pulse inline-block',
              className ?? 'h-4 w-1/2 bg-base-100',
            ),
            style: style,
            key: index,
          }),
        )}
    </>
  );
};

export default TextSkeleton;
