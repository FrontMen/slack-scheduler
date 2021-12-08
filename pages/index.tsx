import type { NextPage, GetServerSideProps } from 'next';
import { AdminLayout } from '@layouts/.';
import useGetAllEmployees from '@hooks/getAllEmployees';
import { getAllEmployees } from '@data/employees';

type Props = {
  data: Employee[];
};
const Home: NextPage<Props> = ({ data }) => {
  console.log(data);

  return (
    <AdminLayout>
      <h2>Birthdays</h2>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllEmployees();
  return {
    props: {
      data,
    },
  };
};

export default Home;
