/** @format */

import React from "react";
import "./Loader.css";
import { Box } from "@chakra-ui/react";

const ListSkeletonLoader = () => {
  return (
    <React.Fragment>
      <Box className='list_loader_header'>
        <Box className='loader_bheader_box skeleton'></Box>
        <Box className='loader_bheader_box skeleton'></Box>
        <Box className='loader_bheader_box skeleton'></Box>
        <Box className='loader_bheader_box skeleton'></Box>
      </Box>

      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
      <Box className='loader_list skeleton'></Box>
    </React.Fragment>
  );
};

export default ListSkeletonLoader;
