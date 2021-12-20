import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { getDB } from '@data/store';
import { User } from 'firebase/auth';

export const postMessage = async (data: Message, user: User): Promise<string> => {
  const db = await getDB();

  const newData: Message = {
    ...data,
    lastUpdateDate: Date.now(),
    lastUpdatedBy: user.uid,
  };

  if (newData.id) {
    const docRef = doc(db, 'messages', newData.id);
    await updateDoc(docRef, newData);
    return newData.id;
  }
  delete newData.id;

  newData.createDate = Date.now();
  newData.createdBy = user.uid;

  const docRef = await addDoc(collection(db, 'messages'), newData);
  return docRef.id;
};
