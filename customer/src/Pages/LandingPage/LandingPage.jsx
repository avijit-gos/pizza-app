/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";

const LandingPage = () => {
  return (
    <Box className='landing_page'>
      <LargeScreen />
      <SmallScreen />
    </Box>
  );
};

export default LandingPage;
