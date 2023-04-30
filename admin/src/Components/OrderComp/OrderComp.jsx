/** @format */

import {
  Box,
  Tr,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React from "react";
import getTime from "../../Utils/getTime";
import { AiOutlineCaretDown } from "react-icons/ai";

const OrderComp = ({ data }) => {
  const [status, setStatus] = React.useState(data.order_status);
  console.log(data);
  return (
    <Tr className='active_table'>
      {/* Order id */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        {data._id}
      </Td>

      {/* Item id */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        {data.item_id.map((id) => (
          <Box>{id}</Box>
        ))}
      </Td>

      {/* user id */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        {data.user._id}
      </Td>

      {/* User location */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        {data.address.location}
      </Td>

      {/* Phone number */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        {data.address.phn}
      </Td>

      {/* Order status menu */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        <Menu>
          <MenuButton className='table_menu_btn' as={Button}>
            {status === 0 ? "Cooking" : status === 1 ? "Delivered" : "Receive"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setStatus(0)}>Cooking</MenuItem>
            <MenuItem onClick={() => setStatus(1)}>Delivered</MenuItem>
            <MenuItem onClick={() => setStatus(2)}>Received</MenuItem>
          </MenuList>
        </Menu>
      </Td>

      {/* Paymeny method */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        {data.payment_mode.toUpperCase()}
      </Td>

      {/* Time */}
      <Td
        className={
          status === 0 ? "cooking" : status === 1 ? "delivered" : "receive"
        }>
        {getTime(new Date(), new Date(data.createdAt))}
      </Td>
    </Tr>
  );
};

export default OrderComp;
