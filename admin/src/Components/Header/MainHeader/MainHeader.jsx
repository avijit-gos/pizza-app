/** @format */

import {
  Box,
  Img,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import Logo from "../../../Assets/logo.png";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { RiMenuFill } from "react-icons/ri";
import DrawerComp from "../../DrawerComp/DrawerComp";

const MainHeader = () => {
  const [openDrawr, setOpenDrawer] = React.useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <Box className='main_navbar'>
      {/* Handle Drawer component */}
      {openDrawr && (
        <DrawerComp isOpen={openDrawr} onClose={handleCloseDrawer} />
      )}
      {/* App Info section */}
      <Box className='app_info'>
        <Img src={Logo} className='logo_image' />
        <span className='app_name'>Fresh</span>
      </Box>

      {/* Others section  */}
      <Box className='main_nav_others_box'>
        <Button className='navbar_button'>
          <AiOutlineSearch className='navbar_icon' />
        </Button>

        <Button className='navbar_button'>
          <AiOutlineBell className='navbar_icon' />
        </Button>

        <Menu>
          <MenuButton as={Button} className='navbar_button'>
            <Avatar src='' className='avatar_icon' />
          </MenuButton>
          <MenuList>
            <MenuItem className='navbar_menu_item'>Wishlists</MenuItem>
            <MenuItem className='navbar_menu_item'>My orders</MenuItem>
            <MenuItem className='navbar_menu_item logout'>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Box className='small_screen_nav_icons_section'>
        <Button className='navbar_button'>
          <AiOutlineBell className='navbar_icon' />
        </Button>

        <Button className='navbar_button'>
          <AiOutlineSearch className='navbar_icon' />
        </Button>

        <Button className='navbar_button' onClick={() => setOpenDrawer(true)}>
          <RiMenuFill className='navbar_icon' />
        </Button>
      </Box>
    </Box>
  );
};

export default MainHeader;
