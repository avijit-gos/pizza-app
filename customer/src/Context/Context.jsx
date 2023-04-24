/** @format */
import React from "react";
import { createContext, useContext } from "react";

const CreateContext = createContext();

function CreateContextProvider({ children }) {
  const [pageType, setPageType] = React.useState("home");
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartCount, setCartCount] = React.useState(0);
  return (
    <CreateContext.Provider
      value={{
        pageType,
        setPageType,
        items,
        setItems,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
      }}>
      {children}
    </CreateContext.Provider>
  );
}

export const GlobalContext = () => {
  return useContext(CreateContext);
};

export default CreateContextProvider;
