/** @format */

import React from "react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import { Box } from "@chakra-ui/react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const { setPageType } = GlobalContext();
  const location = useLocation();
  const [pathName, setPathName] = React.useState("");

  React.useLayoutEffect(() => {
    setPageType("home");
  }, []);

  React.useEffect(() => {
    setPathName(location.pathname);
  });
  return (
    <Layout>
      <Box className='home_section'>
        {/* Nested home routes */}
        <Box className='home_nested_route_section'>
          <NavLink
            to=''
            className={
              pathName === "/" ? "home_route active_home_route" : "home_route"
            }>
            Items
          </NavLink>

          <NavLink
            to='orders'
            className={
              pathName === "/orders"
                ? "home_route active_home_route"
                : "home_route"
            }>
            Orders
          </NavLink>

          <NavLink
            to='analytics'
            className={
              pathName === "/analytics"
                ? "home_route active_home_route"
                : "home_route"
            }>
            Analytics
          </NavLink>
        </Box>

        {/* Filtering section */}

        {/* Rendering components */}
        <Outlet />
      </Box>
    </Layout>
  );
};

export default Home;
