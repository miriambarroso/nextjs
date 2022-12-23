import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { classNames } from '@/utils';

type AccordionItem = {
  name: string;
  href: string;
  icon?: any;
};

type Props = {
  items: AccordionItem[][];
  name: string | ReactNode;
  onClick: () => void;
};

const AccordionNav = ({ name, items, onClick }: Props) => {
  return (
    <>
      <Disclosure
        as="div"
        className="shadow bg-white rounded-box  transition duration-500 ease-linear"
      >
        {({ open, close }) => (
          <>
            <Disclosure.Button
              as={'button'}
              className={classNames(
                'flex uppercase w-full justify-center items-center relative after:transition-all after:duration-150 after:absolute after:top-0 after:left-auto after:h-full after:border-b  px-4 py-4 text-center font-noto-sans bg-neutral text-white  focus:outline-none',
                open
                  ? 'after:w-full after:border-primary'
                  : 'after:w-10/12 after:border-base-100/30',
              )}
            >
              {name instanceof String ? <span>{name}</span> : name}{' '}
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel static className=" text-sm text-secondary">
                {items.map((item, index) => (
                  <div key={index} className="px-1 py-1 ">
                    {item.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={
                          'group flex w-full items-center px-2 py-2 text-sm'
                        }
                        onClick={() => {
                          close();
                          onClick();
                        }}
                      >
                        {/*{active ? (*/}
                        {/*  <EditActiveIcon*/}
                        {/*    className="mr-2 h-5 w-5"*/}
                        {/*    aria-hidden="true"*/}
                        {/*  />*/}
                        {/*) : (*/}
                        {/*  <EditInactiveIcon*/}
                        {/*    className="mr-2 h-5 w-5"*/}
                        {/*    aria-hidden="true"*/}
                        {/*  />*/}
                        {/*)}*/}
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default AccordionNav;
