/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { GlobalContext } from "../../Context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";
import FullItemSkeletonLoader from "../../Components/Loaders/SkeletonLoader/FullItemSkeletonLoader";
import FullItemComp from "../../Components/FullItem/FullItemComp";

const FullItem = () => {
  const { id } = useParams();
  const { setPageType } = GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [update, setUpdate] = React.useState(null);

  React.useLayoutEffect(() => {
    setPageType("full_item");
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, update]);

  return (
    <Layout pageTitle='Item'>
      {id ? (
        <Box className='full_post_page'>
          {isLoading ? (
            <FullItemSkeletonLoader />
          ) : (
            <>
              {item ? (
                <FullItemComp item={item} setUpdate={setUpdate} />
              ) : (
                <Box className='empty_ite_page'>No item found</Box>
              )}
            </>
          )}
        </Box>
      ) : (
        <Box className='empty_ite_page'>Opps! something went wrong</Box>
      )}
    </Layout>
  );
};

export default FullItem;
