import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuthUser } from '@context/.';

const Home: NextPage = () => {
  const { signIn, signOut, isLoggedIn, isLoading, user } = useAuthUser();

  if (isLoading) return <div>...loading</div>;

  return (
    <div>
      <main>
        {isLoggedIn && <button onClick={signOut}>logout {user?.displayName}</button>}
        {!isLoggedIn && <button onClick={signIn}>login</button>}
      </main>
    </div>
  );
};

export default Home;
