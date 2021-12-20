import { useEffect, useState } from 'react';
import { useDataContext } from '@context/DataContext';

export type ReturnDataType<T> = {
  data: T | null | undefined;
  reload: (val: string) => void;
};

const useGetData = <T,>(
  id: string,
  getDataFnc: (id: string) => Promise<T | null>
): ReturnDataType<T> => {
  const [data, setData] = useState<T | null>();
  const [innerId, setInnerId] = useState(id);
  const { setIsLoading, setError } = useDataContext();
  const [isStartReload, setIsStartReload] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = (await getDataFnc(innerId)) as T;
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

  const reload = (val: string) => {
    setInnerId(val);
    setIsStartReload(true);
  };

  return {
    data,
    reload,
  };
};

export { useGetData };
