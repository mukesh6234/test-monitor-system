import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const searchContext = createContext();
const searchContextUpdate = createContext();

export function useSearch() {
  return useContext(searchContext);
}

export function useSearchUpdate() {
  return useContext(searchContextUpdate);
}

export function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();



  useEffect(() => {
    setSearchValue("");
  }, [router.query]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <searchContext.Provider value={searchValue}>
      <searchContextUpdate.Provider value={handleSearch}>
        {children}
      </searchContextUpdate.Provider>
    </searchContext.Provider>
  );
}
