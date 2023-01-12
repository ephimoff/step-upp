import { UserType } from '@/types/types';
import React, { createContext, useContext, useMemo, useState } from 'react';
// import useUser from '@/hooks/useUser';

interface GlobalContextProps {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

type ProviderProps = {
  children: React.ReactNode;
};

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalContextProvider = ({ children }: ProviderProps) => {
  // const value = useUser();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const value = useMemo<GlobalContextProps | null>(
    () => ({ currentUser, setCurrentUser, loading, setLoading }),
    [currentUser, setCurrentUser, loading, setLoading]
  );

  // console.log('value', );
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useUser = () => useContext(GlobalContext) as GlobalContextProps;
