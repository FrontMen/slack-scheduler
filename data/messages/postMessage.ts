import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { getDB } from '@data/store';

export const postMessage = async (data: Message): Promise<string> => {
  const db = await getDB();
  if (data.id) {
    const docRef = doc(db, 'messages', data.id);
    await updateDoc(docRef, data);
    return data.id;
  }
  delete data.id;
  const docRef = await addDoc(collection(db, 'messages'), data);
  return docRef.id;
};
