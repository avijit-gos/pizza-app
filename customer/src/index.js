/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import CreateContextProvider from "./Context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CreateContextProvider>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </CreateContextProvider>
);
