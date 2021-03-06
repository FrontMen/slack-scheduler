import { doc, getDoc } from 'firebase/firestore';
import { getDB } from '@data/store';

export const getMessage = async (id: string | undefined): Promise<Message | null> => {
  if (!id) return null;
  const db = await getDB();
  const docRef = doc(db, 'messages', id);
  const docSnap = await getDoc(docRef);

  console.log(111, { id });
  if (docSnap.exists()) {
    return { id, ...docSnap.data() } as Message;
  }
  // doc.data() will be undefined in this case
  console.log('No such document!');
  return null;
};
