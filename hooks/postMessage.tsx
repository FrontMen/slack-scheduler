import { useDataContext } from '@context/DataContext';
import { getMessage, postMessage } from '@data/messages';

import { useGetData } from './getData';

const usePostMessage = (): { submitData: (data: Message) => Promise<string> } => {
  const { setIsLoading, setError } = useDataContext();

  const submitData = async (data: Message): Promise<string> => {
    setIsLoading(true);
    const result = await postMessage(data);

    setIsLoading(false);
    return result;
  };

  return { submitData };
};

export default usePostMessage;
