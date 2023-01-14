import React, { createContext, useContext, useState } from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<any | null>(null);

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [open, setOpen] = useState(true);

  return (
    <UserContext.Provider value={{ open, setOpen }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
