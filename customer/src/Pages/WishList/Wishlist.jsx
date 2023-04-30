/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../../Layout/Layout";
import { GlobalContext } from "../../Context/Context";
import axios from "axios";
import SkeletonLoader from "../../Components/Loaders/SkeletonLoader/SkeletonLoader";
import ItemComp from "../../Components/ItemComp/ItemComp";

const Wishlist = () => {
  const { setPageType } = GlobalContext();
  const [lists, setLists] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // **** Fetch wishlist items **** //
  React.useEffect(() => {
    setIsLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/user/fetch/wishlist`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setIsLoading(false);
        setLists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useLayoutEffect(() => {
    setPageType("wishlist");
  }, []);
  return (
    <Layout pageTitle='Wishlist'>
      <Box className='wishlist_page'>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            {(lists || []).length > 0 ? (
              <>
                {lists.map((data) => (
                  <ItemComp key={data._id} item={data} />
                ))}
              </>
            ) : (
              <Box className='empty_list'>Nothing added in wishlist cart</Box>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Wishlist;
