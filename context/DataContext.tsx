import { createContext, useContext, FC, useState } from 'react';
import 'firebase/auth';
import '@client/auth';

type DataContextProps = {
  error?: Error;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setError: (value?: Error) => void;
};

const dataContext = createContext<DataContextProps>({
  isLoading: false,
  setIsLoading: (value: boolean) => {},
  setError: (value?: Error) => {},
});

export const useDataContext = () => useContext(dataContext);

export const DataProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const handleSetIsLoading = (value: boolean) => setIsLoading(value);
  const handleSetError = (value?: Error) => setError(value);

  return (
    <dataContext.Provider
      value={{ isLoading, error, setIsLoading: handleSetIsLoading, setError: handleSetError }}
    >
      {children}
    </dataContext.Provider>
  );
};
