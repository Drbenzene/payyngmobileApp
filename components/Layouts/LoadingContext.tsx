import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
