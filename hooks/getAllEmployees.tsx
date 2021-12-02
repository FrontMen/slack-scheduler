import { useEffect, useState } from 'react';

import { Employee } from '@types/.';
import { getAllEmployees } from '@data/employees';
import { useDataContext } from '@context/DataContext';

const useGetAllEmployees = () => {
  const [data, setData] = useState<Employee[]>([]);
  const { setIsLoading, setError } = useDataContext();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const result = await getAllEmployees();
        setData(result);
        setError();
      } catch (e) {
        setData([]);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return {
    data,
  };
};

export default useGetAllEmployees;
