import { getDB } from '@data/store';
import { User } from '@types/.';
import { doc, getDoc } from 'firebase/firestore';

export const isUserAdmin = async (uid: string): Promise<boolean> => {
  const db = await getDB();
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return (docSnap.data() as User).isAdmin;
  }
  return false;
};
