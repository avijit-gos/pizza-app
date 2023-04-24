/** @format */

import React from "react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import { Box } from "@chakra-ui/react";

const Cart = () => {
  const { setPageType } = GlobalContext();

  React.useLayoutEffect(() => {
    setPageType("home");
  }, []);
  return (
    <Layout>
      <Box className='home_section'>Cart</Box>
    </Layout>
  );
};

export default Cart;
