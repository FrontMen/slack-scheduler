import { Message } from '@types/.';
import { getAllMessages } from '@data/messages';

import { useGetData } from './getData';

const useGetAllMessages = (): { data: Message[] } => {
  const data = useGetData<Message[]>(getAllMessages, []);
  return { ...data };
};

export default useGetAllMessages;
