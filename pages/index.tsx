import type { NextPage, GetServerSideProps } from 'next';
import { AdminLayout } from '@layouts/.';
import { getAllEmployees } from '@data/employees';
import { List } from '@mui/material';
import { EmployeeListItem } from '@features/.';

type Props = {
  data: Employee[];
};
const Home: NextPage<Props> = ({ data }) => {
  const newEmployee = {
    id: '',
    email: 'new',
    startDate: '',
    birthDate: '',
  };

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
  const data = await getAllEmployees();
  return {
    props: {
      data,
    },
  };
};

export default Home;
