import { getAllMessages } from '@data/messages';

import { useGetData } from './getData';

const useGetAllMessages = (): { data: Message[] } => {
  const { data, ...result } = useGetData<Message[]>(getAllMessages);
  if (!data) return { data: [], ...result };
  return { data, ...result };
};

export default useGetAllMessages;
