import { createContext, useContext, FC, useState } from 'react';
import 'firebase/auth';
import '@data/auth';

type DataContextProps = {
  error?: unknown;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setError: (value?: unknown) => void;
};

const dataContext = createContext<DataContextProps>({
  isLoading: false,
  setIsLoading: (value: boolean) => {},
  setError: (value?: unknown) => {},
});

export const useDataContext = () => useContext(dataContext);

export const DataProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const handleSetIsLoading = (value: boolean) => setIsLoading(value);
  const handleSetError = (value?: unknown) => setError(value);

  return (
    <dataContext.Provider
      value={{ isLoading, error, setIsLoading: handleSetIsLoading, setError: handleSetError }}
    >
      {children}
    </dataContext.Provider>
  );
};
