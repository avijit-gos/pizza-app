/** @format */

import {
  Box,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import AuthButton from "../ButtonComp/AuthButton";
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
    setIsLoading(true);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/cart/${item._id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsLoading(false);
        setCartItems((prev) => [...prev, item]);
        setCartCount((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
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

      {isLoading ? (
        <Button className='loading_add_to_cart'>
          <Spinner />
        </Button>
      ) : (
        <Button className='add_to_cart' onClick={() => handleAddToCart(item)}>
          <span className='btn_text'>Add to cart</span>
          <span className='item_price'>₹ {price}</span>
        </Button>
      )}
    </Box>
  );
};

export default ItemComp;
