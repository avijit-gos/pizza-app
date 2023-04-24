/** @format */

import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const DrawerComp = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>

        <DrawerBody>
          <Box className='drawer_nav_links'>
            <Box className='drawer_nav_item'>My wishlists</Box>

            <Box className='drawer_nav_item'>My orders</Box>

            <Box className='drawer_nav_item'>Logout</Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComp;
