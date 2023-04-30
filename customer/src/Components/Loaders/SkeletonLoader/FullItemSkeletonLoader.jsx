/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";

const FullItemSkeletonLoader = () => {
  return (
    <Box className='full_post_skeleton_loader_page'>
      {/* Title */}
      <Box className='full_item_title_loader skeleton'></Box>
      <Box className='full_item_img_loader skeleton'></Box>
      <Box className='full_item_description_loader_section'>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
        <Box className='full_item_description_loader_section_last skeleton'></Box>
      </Box>

      <Box className='full_item_description_loader_section'>
        <Box className='full_item_title_loader skeleton'></Box>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
        <Box className='full_item_description_loader_section_one skeleton'></Box>
      </Box>
    </Box>
  );
};

export default FullItemSkeletonLoader;
