import { getMessage } from '@data/messages';
import { ReturnDataType, useGetData } from './getData';

const useGetMessage = (id: string): ReturnDataType<Message> => {
  const result = useGetData<Message>(id, getMessage);
  return { ...result };
};

export default useGetMessage;
