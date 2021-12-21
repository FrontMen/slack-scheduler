import { doc, getDoc, getDocs, query, where, collection, limit } from 'firebase/firestore';
import { getDB } from '@data/store';
import { format } from 'date-fns';

export const getBirthdayToSend = async (): Promise<Employee | null> => {
  const db = await getDB();
  const docsRef = collection(db, 'employees');

  console.log(format(new Date(), 'LL-dd'));
  const q = await query(docsRef, where('birthDay', '==', format(new Date(), 'LL-dd')), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const data = querySnapshot.docs[0].data();
    return { id: querySnapshot.docs[0].id, ...data } as Employee;
  }

  console.log('No document!');
  return null;
};
