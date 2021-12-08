import { getAllEmployees } from '@data/employees';
import { useGetData } from './getData';

const useGetAllEmployees = () => {
  const { data, ...result } = useGetData<Employee[]>(getAllEmployees);
  if (!data) return { data: [], ...result };
  return { data, ...result };
};

export default useGetAllEmployees;
