import { collection, getDocs } from 'firebase/firestore';
import { getDB } from '@data/store';
import { Employee } from '@types/.';

export const getAllEmployees = async (): Promise<Employee[]> => {
  const db = await getDB();
  const result = await getDocs(collection(db, 'employees'));

  const data: Employee[] = [];
  result.forEach((doc) => {
    data.push(doc.data() as Employee);
  });

  return data;
};
