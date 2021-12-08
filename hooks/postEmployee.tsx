import { useDataContext } from '@context/DataContext';
import { postEmployee } from '@data/employees';

import { useGetData } from './getData';

const usePostEmployee = (): { submitData: (data: Employee) => Promise<string> } => {
  const { setIsLoading, setError } = useDataContext();

  const submitData = async (data: Employee): Promise<string> => {
    setIsLoading(true);
    const result = await postEmployee(data);

    setIsLoading(false);
    return result;
  };

  return { submitData };
};

export default usePostEmployee;
