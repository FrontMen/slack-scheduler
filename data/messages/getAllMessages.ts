import { collection, getDocs } from 'firebase/firestore';
import { getDB } from '@data/store';

export const getAllMessages = async (): Promise<Message[]> => {
  const db = await getDB();
  const result = await getDocs(collection(db, 'messages'));

  const data: Message[] = [];
  result.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Message);
  });

  return data;
};
