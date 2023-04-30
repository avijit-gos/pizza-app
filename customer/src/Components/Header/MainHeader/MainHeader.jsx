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
import { AiOutlineShoppingCart, AiOutlineBell } from "react-icons/ai";
import { RiMenuFill } from "react-icons/ri";
import { GlobalContext } from "../../../Context/Context";
import DrawerComp from "../../DrawerComp/DrawerComp";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const MainHeader = ({ pageTitle }) => {
  const navigate = useNavigate();
  const { cartCount, pageType } = GlobalContext();
  const [openDrawr, setOpenDrawer] = React.useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const backToPage = () => {
    navigate(-1);
  };
  return (
    <Box className='main_navbar'>
      {/* Handle Drawer component */}
      {openDrawr && (
        <DrawerComp isOpen={openDrawr} onClose={handleCloseDrawer} />
      )}
      {/* App Info section */}
      {pageType === "home" ? (
        <Box className='app_info'>
          <Img src={Logo} className='logo_image' />
          <span className='app_name'>Fresh</span>
        </Box>
      ) : (
        <Button className='back_btn' onClick={backToPage}>
          <BiArrowBack />
          <span className='btn_text'>{pageTitle}</span>
        </Button>
      )}

      {/* Others section  */}
      <Box className='main_nav_others_box'>
        <Button
          className='navbar_button cart_btn'
          onClick={() => navigate("/cart")}>
          <AiOutlineShoppingCart className='navbar_icon ' />
          <span className='cart_count'>{cartCount}</span>
        </Button>

        <Button className='navbar_button'>
          <AiOutlineBell className='navbar_icon' />
        </Button>

        <Menu>
          <MenuButton as={Button} className='navbar_button'>
            <Avatar src='' className='avatar_icon' />
          </MenuButton>
          <MenuList>
            <MenuItem
              className='navbar_menu_item'
              onClick={() => navigate("/wishlist")}>
              Wishlists
            </MenuItem>
            <MenuItem className='navbar_menu_item'>My orders</MenuItem>
            <MenuItem className='navbar_menu_item logout'>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Box className='small_screen_nav_icons_section'>
        <Button className='navbar_button'>
          <AiOutlineBell className='navbar_icon' />
        </Button>

        <Button
          className='navbar_button cart_btn'
          onClick={() => navigate("/cart")}>
          <AiOutlineShoppingCart className='navbar_icon ' />
          <span className='cart_count'>{cartCount}</span>
        </Button>

        <Button className='navbar_button' onClick={() => setOpenDrawer(true)}>
          <RiMenuFill className='navbar_icon' />
        </Button>
      </Box>
    </Box>
  );
};

export default MainHeader;
