import { Menu, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Fragment, FunctionComponent } from 'react';
import Link from 'next/link';

type DropdownItem = {
  name: string;
  href?: string;
  action?: () => Promise<void> | void;
  icon?: FunctionComponent;
};

type Props = {
  items: DropdownItem[][];
  content: any;
};

const SubItem = ({
  item,
  active,
  close,
}: {
  item: DropdownItem;
  active: boolean;
  close: () => void;
}) => {
  let ItemIcon: FunctionComponent<{}> = () => null;

  if (item.icon) {
    ItemIcon = item.icon;
    ItemIcon.defaultProps = { className: 'w-5 h-5' };
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={close}
        className={`${
          active ? 'bg-neutral text-white' : 'text-gray-900'
        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-neutral hover:text-white justify-between`}
      >
        {item.name}
        {<ItemIcon />}
      </Link>
    );
  }
  if (item.action) {
    return (
      <button
        onClick={() => {
          item.action();
          close();
        }}
        className={`${
          active ? 'bg-neutral text-white' : 'text-gray-900'
        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-neutral hover:text-white justify-between`}
      >
        {item.name}
        {<ItemIcon />}
      </button>
    );
  }
};

const DropdownNav = ({ items, content }: Props) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left z-10 text-secondary"
    >
      <div>
        <Menu.Button className="inline-flex items-center ">
          {content instanceof String ? (
            <>
              {content}
              <BiChevronDown className={'text-xl'} />
            </>
          ) : (
            content
          )}
          {/*<ChevronDownIcon*/}
          {/*  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"*/}
          {/*  aria-hidden="true"*/}
          {/*/>*/}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item, index) => (
            <div key={index} className="px-1 py-1 ">
              {item.map((subItem, subIndex) => (
                <Menu.Item key={subIndex}>
                  {({ active, close }) => (
                    <SubItem item={subItem} active={active} close={close} />
                  )}
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownNav;
