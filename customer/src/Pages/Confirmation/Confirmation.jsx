/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import axios from "axios";
import SkeletonLoader from "../../Components/Loaders/SkeletonLoader/SkeletonLoader";

const Confirmation = () => {
  const { setPageType, setCartItems, cartItems } = GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [details, setDetails] = React.useState({});

  // fetch cart items
  React.useEffect(() => {
    setIsLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/fetch/cart`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.items);
        setCartItems(response.data.items);
        var items = [];
        var totalPrice = 0;
        for (let i = 0; i < response.data.items.length; i++) {
          items.push(response.data.items[i]._id);
          totalPrice += response.data.items[i].item.price;
        }
        console.log(totalPrice);
        setDetails({
          ...details,
          price: totalPrice,
          items: JSON.stringify(items),
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useLayoutEffect(() => {
    setPageType("confirmation_page");
  }, []);
  return (
    <Layout pageTitle='Confirmation'>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {(cartItems || []).length > 0 ? (
            <Box className='confirmation_page'>{JSON.stringify(details)}</Box>
          ) : (
            <Box className='empty_lists'>Nothing in cart</Box>
          )}
        </>
      )}
    </Layout>
  );
};

export default Confirmation;
