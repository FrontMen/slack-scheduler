import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { getDB } from '@data/store';

export const postEmployee = async (data: Employee): Promise<string> => {
  const db = await getDB();
  if (data.id) {
    const docRef = doc(db, 'employees', data.id);
    await updateDoc(docRef, data);
    return data.id;
  }

  delete data.id;
  const docRef = await addDoc(collection(db, 'employees'), data);
  return docRef.id;
};
