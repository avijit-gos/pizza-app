/** @format */

import React from "react";
import { Box, useToast } from "@chakra-ui/react";
import SkeletonLoader from "../../../Components/Loaders/SkeletonLoader/SkeletonLoader";
import ItemComp from "../../../Components/ItemComp/ItemComp";
import { GlobalContext } from "../../../Context/Context";
import axios from "axios";

const Pizzas = () => {
  const { items, setItems } = GlobalContext();
  const toast = useToast();
  const [isPageLoad, setIsPageLoad] = React.useState(false);

  React.useEffect(() => {
    setIsPageLoad(true);
    setTimeout(() => {
      setIsPageLoad(false);
    }, 1500);
  }, []);

  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/type?type=pizza`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box className='item_container'>
      {" "}
      {isPageLoad ? (
        <SkeletonLoader />
      ) : (
        <>
          {(items || []).length > 0 ? (
            <Box className='item_card_section'>
              {items.map((item) => (
                <ItemComp key={item._id} item={item} />
              ))}
            </Box>
          ) : (
            <Box className='empty_item_box'>No item found</Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Pizzas;
