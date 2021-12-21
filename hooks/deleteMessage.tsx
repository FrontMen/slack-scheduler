import { useDataContext } from '@context/DataContext';
import { useAuthUser } from '@context/UserContext';
import { deleteMessage } from '@data/messages';

const useDeleteMessage = (): { submitData: (id: string) => Promise<void> } => {
  const { setIsLoading, setError } = useDataContext();
  const { user } = useAuthUser();

  const submitData = async (id: string): Promise<void> => {
    if (!user) return;

    setIsLoading(true);
    const result = await deleteMessage(id);

    setIsLoading(false);
    return result;
  };

  return { submitData };
};

export default useDeleteMessage;
