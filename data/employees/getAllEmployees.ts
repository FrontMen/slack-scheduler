import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { getDB } from '@data/store';

const convertTimestamps = (data) =>
  data.map((obj) => {
    Object.keys(obj).map((key) => {
      if (obj[key] instanceof Timestamp) {
        obj[key] = obj[key].seconds;
      }
    });
    return obj;
  });

export const getAllEmployees = async (): Promise<Employee[]> => {
  const db = await getDB();
  const result = await getDocs(collection(db, 'employees'));

  const data: Employee[] = [];
  result.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Employee);
  });

  return convertTimestamps(data);
};
