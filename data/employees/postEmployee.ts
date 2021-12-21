import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { getDB } from '@data/store';
import { format } from 'date-fns';

export const postEmployee = async (data: Employee): Promise<string> => {
  const db = await getDB();

  // add birthday, derived from birtDate
  data.birthDay = format(new Date(data.birthDate), 'LL-dd');

  if (data.id) {
    const docRef = doc(db, 'employees', data.id);
    await updateDoc(docRef, data);
    return data.id;
  }

  delete data.id;
  const docRef = await addDoc(collection(db, 'employees'), data);
  return docRef.id;
};
