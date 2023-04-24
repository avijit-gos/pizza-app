/** @format */

import {
  Box,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import ModalComp from "../ModalComp/ModalComp";
import AuthButton from "../ButtonComp/AuthButton";
import InputComp from "../InputComp/InputComp";
import TextareaComp from "../InputComp/TextareaComp";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";

const ItemComp = ({ item }) => {
  const { items, setItems } = GlobalContext();
  const [image, setImage] = React.useState(item.image);
  const [title, setTitle] = React.useState(item.title);
  const [description, setDescription] = React.useState(item.description);
  const [price, setPrice] = React.useState(item.price);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [itemId, setItemId] = React.useState("");

  // *** Handle title change
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  // *** Handle description change
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // *** Handle price change
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  React.useEffect(() => {
    if (!title.trim() || !description.trim() || price <= 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, description, price]);

  const onClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  };

  // *** Handle openEdit modal
  const handleOpenEditModal = (id) => {
    setItemId(id);
    setOpenEditModal(true);
  };

  // *** Handle update item
  const handleUpdateItem = () => {
    setIsLoading(true);
    setIsDisable(false);
    let data = JSON.stringify({
      title: title,
      description: description,
      price: price,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/update/${itemId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        onClose();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // *** Handle open Delete modal
  const handleOpenDeleteModal = (id) => {
    setItemId(id);
    setOpenDeleteModal(true);
  };

  // *** Handle update item
  const handleDeleteItem = () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/delete/${itemId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        onClose();
        const temp = items;
        console.log("ITEMS: ", items);
        const arr = temp.filter((data) => data._id !== itemId);
        console.log("RESULT: ", arr);
        setItems(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className='item_card'>
      {openEditModal && (
        <ModalComp
          isOpen={openEditModal}
          onClose={onClose}
          title={
            <Box className='modal_title_section'>
              <span className='title_text'>Update item</span>
              <AuthButton
                isDisable={isDisable}
                disableClassName='disable_create_btn'
                auth_btn='create_btn'
                isLoading={isLoading}
                text='Update'
                handleClick={handleUpdateItem}
              />
            </Box>
          }
          body={
            <Box>
              <InputComp
                type='text'
                placeholder='Product title'
                className='form_input'
                value={title}
                handleChange={(e) => handleTitle(e)}
              />
              <TextareaComp
                type='text'
                placeholder='Produce description'
                className='form_textarea'
                value={description}
                handleChange={(e) => handleDescription(e)}
              />

              <InputComp
                type='number'
                placeholder='Product price'
                className='form_input'
                value={price}
                handleChange={(e) => handlePrice(e)}
              />
            </Box>
          }
        />
      )}

      {openDeleteModal && (
        <ModalComp
          isOpen={openDeleteModal}
          onClose={onClose}
          title={
            <Box className='modal_title_section'>
              <span className='title_text'>Delete item</span>
            </Box>
          }
          body={<Box>Do you want to unlist this item?</Box>}
          footer={
            <AuthButton
              isDisable={isDisable}
              disableClassName='disable_create_btn'
              auth_btn='create_btn'
              isLoading={isLoading}
              text='Delete'
              handleClick={handleDeleteItem}
            />
          }
        />
      )}
      <Menu>
        <MenuButton as={Button} className='menu_btn'>
          <FiMoreHorizontal className='menu_icon' />
        </MenuButton>
        <MenuList>
          <MenuItem
            className='menu_item'
            onClick={() => handleOpenEditModal(item._id)}>
            Edit
          </MenuItem>
          <MenuItem
            className='menu_item delete'
            onClick={() => handleOpenDeleteModal(item._id)}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <Box className='card_img_section'>
        <Img src={image} className='card_image' />
      </Box>
      <Box className='card_title'>{title}</Box>

      <Box className='card_description'>{description}</Box>
    </Box>
  );
};

export default ItemComp;
