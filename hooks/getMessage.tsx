import { getMessage } from '@data/messages';
import { ReturnDataType, useGetData } from './getData';

const useGetMessage = (id: string): ReturnDataType<Message> => {
  const result = useGetData<Message>(getMessage, id);
  return { ...result };
};

export default useGetMessage;
