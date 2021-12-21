import { doc, getDoc, getDocs, query, where, collection, limit } from 'firebase/firestore';
import { getDB } from '@data/store';
import { format } from 'date-fns';

export const getMessageToSend = async (): Promise<Message | null> => {
  const db = await getDB();
  const docsRef = collection(db, 'messages');

  const q = await query(
    docsRef,
    where('plannedSendDate', '==', format(new Date(), 'yyyy-LL-dd')),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs[0].data();

  if (!querySnapshot.empty) {
    return { id: querySnapshot.docs[0].id, ...data } as Message;
  }

  console.log('No document!');
  return null;
};
