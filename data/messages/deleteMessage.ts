import { doc, deleteDoc } from 'firebase/firestore';
import { getDB } from '@data/store';

export const deleteMessage = async (id: string): Promise<void> => {
  const db = await getDB();
  return await deleteDoc(doc(db, 'messages', id));
};
