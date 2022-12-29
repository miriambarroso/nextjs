import { ADMIN, CANDIDATO, EMPREGADOR, SUPERADMIN } from '@/store/auth';

type Props = {};

const Page = ({}: Props) => {
  return <></>;
};

Page.permissions = [SUPERADMIN, ADMIN, EMPREGADOR, CANDIDATO];

export default Page;
