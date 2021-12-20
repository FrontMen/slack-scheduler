import { useDataContext } from '@context/DataContext';
import { useAuthUser } from '@context/UserContext';
import { getMessage, postMessage } from '@data/messages';

import { useGetData } from './getData';

const usePostMessage = (): { submitData: (data: Message) => Promise<string> } => {
  const { setIsLoading, setError } = useDataContext();
  const { user } = useAuthUser();

  const submitData = async (data: Message): Promise<string> => {
    if (!user) return '';

    setIsLoading(true);
    const result = await postMessage(data, user);

    setIsLoading(false);
    return result;
  };

  return { submitData };
};

export default usePostMessage;
