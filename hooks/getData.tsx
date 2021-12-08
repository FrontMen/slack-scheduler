import { useEffect, useState } from 'react';
import { useDataContext } from '@context/DataContext';

export type ReturnDataType<T> = {
  data: T | null | undefined;
  reload: () => void;
};

const useGetData = <T,>(getDataFnc: () => Promise<T | null>): ReturnDataType<T> => {
  const [data, setData] = useState<T | null>();
  const { setIsLoading, setError } = useDataContext();
  const [isStartReload, setIsStartReload] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = (await getDataFnc()) as T;
        setData(result);
        setError();
      } catch (e) {
        setData(null);
        setError(e);
      } finally {
        setIsLoading(false);
        setIsStartReload(false);
      }
    };

    if (isStartReload) {
      setIsLoading(true);
      getData();
    }
  }, [isStartReload]);

  const reload = () => {
    setIsStartReload(true);
  };

  return {
    data,
    reload,
  };
};

export { useGetData };
