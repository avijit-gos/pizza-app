/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../Context/Context";
import MainHeader from "../Components/Header/MainHeader/MainHeader";

function Header({ pageType }) {
  if (pageType === "home") {
    return <MainHeader />;
  }
}

const Layout = ({ children }) => {
  const { pageType } = GlobalContext();
  return (
    <Box className='app_layout'>
      <Header pageType={pageType} />

      <Box className='main_app'>{children}</Box>
    </Box>
  );
};

export default Layout;
