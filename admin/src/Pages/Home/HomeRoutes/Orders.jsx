/** @format */

import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import ListSkeletonLoader from "../../../Components/LoaderComp/ListSkeletonLoader";
import OrderComp from "../../../Components/OrderComp/OrderComp";

const Orders = () => {
  const [orders, setOrders] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:7001/api/item/fetch/order",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box className='order_page'>
      <Box className='order_page_section'>
        <span className='order_page_title'>Orders</span>
        <Box className='order_list_section'>
          {isLoading ? (
            <ListSkeletonLoader />
          ) : (
            <>
              {(orders || []).length > 0 ? (
                <TableContainer>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>Order ID</Th>
                        <Th>Item ID</Th>
                        <Th>User ID</Th>
                        <Th>Address</Th>
                        <Th>Phone</Th>
                        <Th>Order status</Th>
                        <Th>Payment status</Th>
                        <Th>Time</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((data) => (
                        <OrderComp key={data._id} data={data} />
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <Box className='empty_order_list'>No active order</Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;
