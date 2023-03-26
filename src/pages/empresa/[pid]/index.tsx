import { useRouter } from 'next/router';

export default function Page() {
  const route = useRouter();

  return (
    <div>
      <h1>Page 2</h1>
      <p>Route: {route.asPath}</p>
    </div>
  );
}
