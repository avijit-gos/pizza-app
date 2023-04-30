/** @format */

import { Box, Button, Img, Spinner } from "@chakra-ui/react";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GlobalContext } from "../../Context/Context";
import axios from "axios";

const FullItemComp = ({ item, setUpdate, update }) => {
  const { setCartItems, setCartCount } = GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [oneStar, setOneStar] = React.useState(item.one_star);
  const [twoStar, setTwoStar] = React.useState(item.two_star);
  const [threeStar, setThreeeStar] = React.useState(item.three_star);
  const [fourStar, setFourStar] = React.useState(item.four_star);
  const [fiveStar, setFiveStar] = React.useState(item.five_star);
  const [isDisable, setIsDisable] = React.useState(true);

  // **** Add rating of product
  const addRating = (value, id) => {
    if (isDisable) {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}api/item/rating/${id}?type=${value}`,
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          setUpdate(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Toast");
    }
  };

  // *** Add to cart
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

  React.useEffect(() => {
    if (oneStar.includes(JSON.parse(localStorage.getItem("user"))._id)) {
      setIsDisable(false);
    } else {
      if (twoStar.includes(JSON.parse(localStorage.getItem("user"))._id)) {
        setIsDisable(false);
      } else {
        if (threeStar.includes(JSON.parse(localStorage.getItem("user"))._id)) {
          setIsDisable(false);
        } else {
          if (fourStar.includes(JSON.parse(localStorage.getItem("user"))._id)) {
            setIsDisable(false);
          } else {
            if (
              fiveStar.includes(JSON.parse(localStorage.getItem("user"))._id)
            ) {
              setIsDisable(false);
            } else {
              setIsDisable(true);
            }
          }
        }
      }
    }
  }, [update]);
  return (
    <Box className='full_item_comp'>
      {/* Title */}
      <Box className='full_post_header'>
        <Box className='full_post_title'>{item.title}</Box>
        <Button
          className='full_item_add_to_cart'
          onClick={() => handleAddToCart(item)}>
          {isLoading ? <Spinner /> : <>Add to cart</>}
        </Button>
      </Box>

      {/* Image */}
      <Box className='full_post_image'>
        <Img src={item.image} className='full_post_image' />
      </Box>

      {/* Details */}
      <Box className='full_post_description'>{item.description}</Box>

      <Box className='full_post_details'>
        {/* Rating */}
        <Box>
          <Box className='full_post_rating'>
            Total rating:{" "}
            <span className='rating_value'>{item.t_rating.length}</span>
          </Box>
          {/* One star */}
          {oneStar.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
            <Button className='full_post_star_rating'>
              <AiFillStar />:{" "}
              <span className='rating_value'>{item.one_star.length}</span>
            </Button>
          ) : (
            <Button
              className='full_post_star_rating'
              onClick={() => addRating("one", item._id)}>
              <AiOutlineStar />:{" "}
              <span className='rating_value'>{item.one_star.length}</span>
            </Button>
          )}

          <br />

          {/* Two star */}
          {item.two_star.includes(
            JSON.parse(localStorage.getItem("user"))._id
          ) ? (
            <Button className='full_post_star_rating'>
              <AiFillStar />
              <AiFillStar />:{" "}
              <span className='rating_value'>{item.two_star.length}</span>
            </Button>
          ) : (
            <Button
              className='full_post_star_rating'
              onClick={() => addRating("two", item._id)}>
              <AiOutlineStar />
              <AiOutlineStar />:{" "}
              <span className='rating_value'>{item.two_star.length}</span>
            </Button>
          )}

          <br />

          {/* Three star */}
          {item.three_star.includes(
            JSON.parse(localStorage.getItem("user"))._id
          ) ? (
            <Button className='full_post_star_rating'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </Button>
          ) : (
            <Button
              className='full_post_star_rating'
              onClick={() => addRating("three", item._id)}>
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />:{" "}
              <span className='rating_value'>{item.three_star.length}</span>
            </Button>
          )}

          <br />

          {/* four  star*/}
          {item.four_star.includes(
            JSON.parse(localStorage.getItem("user"))._id
          ) ? (
            <Button className='full_post_star_rating'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />:{" "}
              <span className='rating_value'>{item.four_star.length}</span>
            </Button>
          ) : (
            <Button
              className='full_post_star_rating'
              onClick={() => addRating("four", item._id)}>
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />:{" "}
              <span className='rating_value'>{item.four_star.length}</span>
            </Button>
          )}

          <br />

          {/* five star */}
          {item.five_star.includes(
            JSON.parse(localStorage.getItem("user"))._id
          ) ? (
            <Button className='full_post_star_rating'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />:{" "}
              <span className='rating_value'>{item.five_star.length}</span>
            </Button>
          ) : (
            <Button
              className='full_post_star_rating'
              onClick={() => addRating("five", item._id)}>
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />:{" "}
              <span className='rating_value'>{item.five_star.length}</span>
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FullItemComp;
