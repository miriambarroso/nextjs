import { classNames } from '@/utils';
import { BiLinkExternal } from 'react-icons/bi';

type Props = {
  pdf: string;
  iframeProps?: any;
};

export default function PDFViewer({ pdf, iframeProps }: Props) {
  return (
    <>
      <iframe
        src={`/api/pdf-viewer?url=${pdf}`}
        {...iframeProps}
        allowFullScreen={true}
        sandbox={true}
        // style="-webkit-transform:scale(0.5);-moz-transform-scale(0.5);"
      ></iframe>
    </>
  );
}
