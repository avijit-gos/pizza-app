/** @format */
import React from "react";
import { createContext, useContext } from "react";

const CreateContext = createContext();

function CreateContextProvider({ children }) {
  const [pageType, setPageType] = React.useState("home");
  const [items, setItems] = React.useState([]);
  return (
    <CreateContext.Provider value={{ pageType, setPageType, items, setItems }}>
      {children}
    </CreateContext.Provider>
  );
}

export const GlobalContext = () => {
  return useContext(CreateContext);
};

export default CreateContextProvider;
