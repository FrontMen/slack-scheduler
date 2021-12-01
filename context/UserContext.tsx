import { createContext, useContext, FC, useEffect, useState } from 'react';

import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { isUserAdmin } from '@data/user';

type UserContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const userContext = createContext<UserContextProps>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  isAdmin: false,
});

// custom hook to use the authUserContext and access authUser and loading
export const useAuthUser = () => useContext(userContext);

export const UserProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //check for admin
        const result = await isUserAdmin(user.uid);
        setIsAdmin(result);

        setUser(user);
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
  }, []);

  const signIn = async (): Promise<void> => {
    var provider = new GoogleAuthProvider();
    const auth = getAuth();

    await setPersistence(auth, browserLocalPersistence);
    await signInWithPopup(auth, provider);
  };

  const signOut = async (): Promise<void> => {
    const auth = getAuth();

    await auth.signOut();
  };

  // listen for Firebase state change
  useEffect(() => {}, []);

  return (
    <userContext.Provider value={{ signIn, signOut, isLoggedIn, isLoading, user, isAdmin }}>
      {children}
    </userContext.Provider>
  );
};
