import type { NextPage, GetServerSideProps } from 'next';
import { AdminLayout } from '@layouts/.';
import { List } from '@mui/material';
import { EmployeeListItem } from '@features/.';
import useGetAllEmployees from '@hooks/getAllEmployees';

const Home: NextPage = () => {
  const { data } = useGetAllEmployees();

  return (
    <AdminLayout>
      <h2>Birthdays</h2>
      <List>
        {data.map((employee) => (
          <EmployeeListItem key={employee.id} employee={employee} />
        ))}
      </List>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
