/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../Context/Context";
import MainHeader from "../Components/Header/MainHeader/MainHeader";

function Header({ pageType, pageTitle }) {
  return <MainHeader pageTitle={pageTitle} />;
}

const Layout = ({ children, pageTitle }) => {
  const { pageType } = GlobalContext();
  return (
    <Box className='app_layout'>
      <Header pageType={pageType} pageTitle={pageTitle} />

      <Box className='main_app'>{children}</Box>
    </Box>
  );
};

export default Layout;
