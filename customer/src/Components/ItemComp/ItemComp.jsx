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
import axios from "axios";
import { GlobalContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const ItemComp = ({ item }) => {
  const navigate = useNavigate();
  const { items, setItems, cartItems, setCartItems, cartCount, setCartCount } =
    GlobalContext();
  const [image, setImage] = React.useState(item.image);
  const [title, setTitle] = React.useState(item.title);
  const [description, setDescription] = React.useState(item.description);
  const [price, setPrice] = React.useState(item.price);
  const [isLoading, setIsLoading] = React.useState(false);
  const [wishlist, setWishlist] = React.useState(
    JSON.parse(localStorage.getItem("user")).wishlist
  );

  const handleAddToCart = (item) => {
    // console.log(item);
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
        // console.log(JSON.stringify(response.data));
        setIsLoading(false);
        setCartItems((prev) => [...prev, response.data]);
        setCartCount((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToWishList = (data) => {
    if (wishlist.includes(data._id)) {
      const temp = wishlist;
      const result = temp.filter((itemId) => itemId !== data._id);
      setWishlist(result);
    } else {
      setWishlist((prev) => [...prev, data._id]);
    }
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/user/add/wishlist/${data._id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className='item_card'>
      <Button className='menu_btn' onClick={() => addToWishList(item)}>
        <>
          {wishlist.includes(item._id) ? (
            <AiFillHeart className='menu_icon menu_icon_active' />
          ) : (
            <AiOutlineHeart className='menu_icon' />
          )}
        </>
      </Button>
      <Box
        className='card_img_section'
        onClick={() => navigate(`/full/item/${item._id}`)}>
        <Img src={image} className='card_image' />
      </Box>
      <Box
        className='card_title'
        onClick={() => navigate(`/full/item/${item._id}`)}>
        {title}
      </Box>

      <Box
        className='card_description'
        onClick={() => navigate(`/full/item/${item._id}`)}>
        {description}
      </Box>

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
