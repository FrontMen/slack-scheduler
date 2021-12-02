import type { NextPage } from 'next';
import { AdminLayout } from '@layouts/.';
import useGetAllEmployees from '@hooks/getAllEmployees';

const Home: NextPage = () => {
  const { data } = useGetAllEmployees();

  return (
    <AdminLayout>
      <h2>Birthdays</h2>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Home;
