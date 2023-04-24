/** @format */

import {
  Box,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import ModalComp from "../ModalComp/ModalComp";
import AuthButton from "../ButtonComp/AuthButton";
import InputComp from "../InputComp/InputComp";
import TextareaComp from "../InputComp/TextareaComp";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";

const ItemComp = ({ item }) => {
  const { items, setItems, cartItems, setCartItems, cartCount, setCartCount } =
    GlobalContext();
  const [image, setImage] = React.useState(item.image);
  const [title, setTitle] = React.useState(item.title);
  const [description, setDescription] = React.useState(item.description);
  const [price, setPrice] = React.useState(item.price);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [itemId, setItemId] = React.useState("");

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    setCartCount((prev) => prev + 1);
  };

  return (
    <Box className='item_card'>
      <Button className='menu_btn'>
        <AiOutlineHeart className='menu_icon' />
      </Button>
      <Box className='card_img_section'>
        <Img src={image} className='card_image' />
      </Box>
      <Box className='card_title'>{title}</Box>

      <Box className='card_description'>{description}</Box>

      <Button className='add_to_cart' onClick={() => handleAddToCart(item)}>
        <span className='btn_text'>Add to cart</span>
        <span className='item_price'>₹ {price}</span>
      </Button>
    </Box>
  );
};

export default ItemComp;
