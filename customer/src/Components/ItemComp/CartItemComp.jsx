/** @format */

import React from "react";
import { Box, Img, Button, Spinner } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";

const CartItemComp = ({ item }) => {
  const { cartItems, setCartItems } = GlobalContext();

  const handleRemoveItem = (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/remove/cart/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        const temp = cartItems;
        const result = temp.filter((data) => data._id !== id);
        setCartItems(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box className='item_card'>
      <Box className='card_img_section'>
        <Img src={item.item.image} className='card_image' />
      </Box>
      <Box className='card_title'>{item.item.title}</Box>

      <Box className='card_description'>{item.item.description}</Box>

      <Button className='remove_btn' onClick={() => handleRemoveItem(item._id)}>
        <AiOutlineDelete />
      </Button>
    </Box>
  );
};

export default CartItemComp;
