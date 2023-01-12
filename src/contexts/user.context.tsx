// import { UserType } from '@/types/types';
import React, { createContext, useContext, useState } from 'react';

// interface UserContextProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (sidebarOpen: boolean) => void;
// }

type ProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<any | null>(null);

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [open, setOpen] = useState(true);
  // const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  // const [loading, setLoading] = useState(true);

  // const contextValue = useMemo<UserContextProps | null>(
  //   () => ({ currentUser, setCurrentUser, loading, setLoading }),
  //   [currentUser, setCurrentUser, loading, setLoading]
  // );

  // console.log('value', );
  return (
    <UserContext.Provider value={{ open, setOpen }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
