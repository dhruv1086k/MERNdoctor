import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const currentDate = new Date().getFullYear();
    const birthDate = new Date(dob).getFullYear();
    let age = currentDate - birthDate;
    return age;
  };

  const value = { calculateAge };
  return (
    <>
      <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    </>
  );
};

export default AppContextProvider;
