import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { ReactNode, useRef } from "react";

type Props = {
  callback: () => Promise<void>;
  children?: ReactNode;
};
export default function InfiniteScroller({ callback, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [isFetching, setIsFetchingFalse] = useInfiniteScroll(
    () => {
      callback().then(() => setIsFetchingFalse());
    },
    ref.current,
    null
  );

  return (
    <div ref={ref} className="w-full">
      {isFetching ? children : null}
    </div>
  );
}
