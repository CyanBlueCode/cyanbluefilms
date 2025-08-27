import { createContext, useState } from 'react';

const defaultState = {};

export const GlobalContext = createContext({
  state: defaultState,
  updateState: () => {}
});
export const showConstructionBannerContext = createContext(true);

// Generic global context provider, takes key/value pair of string/any
export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <GlobalContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const ShowConstructionBannerContextProvider = ({ children }) => {
  const [showConstructionBanner, setShowConstructionBanner] = useState(true);

  const closeConstructionBanner = () => {
    setShowConstructionBanner(false);
  };

  return (
    <showConstructionBannerContext.Provider
      value={{showConstructionBanner, closeConstructionBanner}}
    >
      {children}
    </showConstructionBannerContext.Provider>
  );
};
