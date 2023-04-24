/** @format */

import { Box, Input, Img, Button } from "@chakra-ui/react";
import React from "react";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const FileInputComp = ({ handleFileChange, id, prevImage }) => {
  return (
    <Box className='file_input_section'>
      {prevImage ? (
        <Box className='prev_img_section'>
          <Img src={prevImage} className='prev_image' />
          <Button className='close_image_btn'>
            <AiOutlineClose className='close_image_btn_icon' />
          </Button>
        </Box>
      ) : (
        <>
          <label htmlFor={id} className='input_file_label'>
            <span className='file_upload'>
              <BsCloudUpload className='file_upload_icon' />
            </span>
            <Input
              type='file'
              id={id}
              className='file_input'
              onChange={handleFileChange}
            />
          </label>
        </>
      )}
    </Box>
  );
};

export default FileInputComp;
