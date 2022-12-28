import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const searchContext = createContext();
// const searchContextUpdate = createContext();

export function useSearch() {
  return useContext(searchContext);
}

// export function useSearchUpdate() {
//   return useContext(searchContextUpdate);
// }

export function SearchProvider({ children }) {
  const [showSearch, setShowSearch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSearchValue("");
  }, [router.query]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleShowSearch = (show) => {
    setShowSearch(show);
  };

  return (
    <searchContext.Provider
      value={{ searchValue, handleSearch, showSearch, handleShowSearch }}
    >
      {/* <searchContextUpdate.Provider value={handleSearch}> */}
      {children}
      {/* </searchContextUpdate.Provider> */}
    </searchContext.Provider>
  );
}
