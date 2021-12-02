// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

let db: Firestore;

const init = () => {
  const privatekey: string = process.env.FIREBASE_PRIVATEKEY || '';

  try {
    const firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    });
  } catch (e) {}

  db = getFirestore();
};

export const getDB = (): Firestore => {
  if (!db) init();

  return db;
};
