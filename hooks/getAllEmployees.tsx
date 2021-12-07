import { Employee } from '@types/.';
import { getAllEmployees } from '@data/employees';
import { useGetData } from './getData';

const useGetAllEmployees = () => {
  const data = useGetData<Employee[]>(getAllEmployees, []);
  return { ...data };
};

export default useGetAllEmployees;
