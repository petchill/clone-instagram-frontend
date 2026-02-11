"use client";
import { createContext, useState, type ReactNode } from "react";

interface RootStore {
  hasNoti: boolean;
  setHasNoti: React.Dispatch<React.SetStateAction<boolean>>;
}

const RootStoreContext = createContext<RootStore>({
  hasNoti: false,
  setHasNoti: () => {},
});

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const [hasNoti, setHasNoti] = useState<boolean>(false);

  return (
    <RootStoreContext.Provider
      value={{
        hasNoti,
        setHasNoti,
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};
