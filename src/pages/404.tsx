import RoboticsPanaIllustration from '@/components/illustration/RoboticsPanaIllustration';
import Link from 'next/link';
import Router from 'next/router';

type Props = {};

const PageNotFound = ({}: Props) => {
  return (
    <>
      <section className="flex items-center h-full">
        <div className="container max-w-3xl gap-4 flex flex-col text-center items-center justify-center px-5 mx-auto my-8">
          <RoboticsPanaIllustration className="w-full" />
          <p className="text-2xl font-semibold md:text-3xl">
            Desculpa, não conseguimos encontrar essa página.
          </p>
          {/*<p className="mt-4 mb-8 dark:text-gray-400">*/}
          {/*  But dont worry, you can find plenty of other things on our*/}
          {/*  homepage.*/}
          {/*</p>*/}
          <div className="flex items-center mt-4 justify-center gap-8">
            <button
              onClick={Router.back}
              className="btn lg:btn-wide btn-neutral"
            >
              Voltar
            </button>
            <Link
              href="/"
              rel="noopener noreferrer"
              className="btn  lg:btn-wide btn-primary"
            >
              Página Inicial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
