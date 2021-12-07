import type { NextPage } from 'next';
import { AdminLayout } from '@layouts/.';
import useGetAllMessages from '@hooks/getAllMessages';

const Home: NextPage = () => {
  const { data } = useGetAllMessages();

  return (
    <AdminLayout>
      <h2>Messages</h2>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Home;
