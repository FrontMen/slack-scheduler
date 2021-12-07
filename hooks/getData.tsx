import { useEffect, useState } from 'react';
import { useDataContext } from '@context/DataContext';

const useGetData = <T,>(
  getDataFnc: () => Promise<T>,
  defaultValue: T
): {
  data: T;
} => {
  const [data, setData] = useState<T>(defaultValue);
  const { setIsLoading, setError } = useDataContext();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const result = ((await getDataFnc()) as T) ?? defaultValue;
        setData(result);
        setError();
      } catch (e) {
        setData(defaultValue);
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

export { useGetData };
