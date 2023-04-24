/** @format */

import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { IoMdCreate } from "react-icons/io";
import ModalComp from "../../../Components/ModalComp/ModalComp";
import AuthButton from "../../../Components/ButtonComp/AuthButton";
import InputComp from "../../../Components/InputComp/InputComp";
import TextareaComp from "../../../Components/InputComp/TextareaComp";
import FileInputComp from "../../../Components/InputComp/FileInputComp";
import SkeletonLoader from "../../../Components/Loaders/SkeletonLoader/SkeletonLoader";
import { GlobalContext } from "../../../Context/Context";
import axios from "axios";
import ItemComp from "../../../Components/ItemComp/ItemComp";
import { AiFillCaretDown } from "react-icons/ai";

const Items = () => {
  const { items, setItems } = GlobalContext();
  const toast = useToast();
  const [openAddItemModal, setOpenAddItemModal] = React.useState(false);
  const [openAnnouncementModal, setOpenAnnouncementModal] =
    React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [prevImage, setPrevImage] = React.useState("");
  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [itemtype, setItemType] = React.useState("");

  const [isPageLoad, setIsPageLoad] = React.useState(false);

  React.useEffect(() => {
    setIsPageLoad(true);
    setTimeout(() => {
      setIsPageLoad(false);
    }, 1500);
  }, []);

  // *** Handle closer modal
  const onClose = () => {
    setOpenAddItemModal(false);
    setOpenAnnouncementModal(false);
  };

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

  // *** Handle image change
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setPrevImage(URL.createObjectURL(e.target.files[0]));
  };

  React.useEffect(() => {
    if (
      !title.trim() ||
      !description.trim() ||
      price <= 0 ||
      !prevImage.trim()
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, description, price, prevImage]);

  // *** Handle create new item
  const handleCreateNewItem = () => {
    setIsPageLoad(true);
    setIsLoading(true);
    setIsDisable(false);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("image", image);
    formdata.append("itemtype", itemtype);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}api/item`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        onClose();
        setTitle("");
        setDescription("");
        setImage("");
        setPrevImage("");
        setIsLoading(false);
        setIsPageLoad(false);
        toast({
          title: `${result.msg}`,
          position: "top-right",
          status: "success",
          isClosable: true,
        });
        setItems((prev) => [result.item, ...prev]);
      })
      .catch((error) => {
        console.log(error);
        onClose();
        setTitle("");
        setDescription("");
        setImage("");
        setPrevImage("");
        setIsLoading(false);
        setIsPageLoad(false);
      });
  };

  // Fetch all listed pizzas
  React.useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item`,
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
      {openAddItemModal && (
        <ModalComp
          isOpen={openAddItemModal}
          onClose={onClose}
          title={
            <Box className='modal_title_section'>
              <span className='title_text'>Create new item</span>
              <AuthButton
                isDisable={isDisable}
                disableClassName='disable_create_btn'
                auth_btn='create_btn'
                isLoading={isLoading}
                text='Create'
                handleClick={handleCreateNewItem}
              />
            </Box>
          }
          body={
            <Box className='create_modal_body'>
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
              <Menu>
                <MenuButton as={Button} className='modal_menu_btn'>
                  <span>Selete item type</span>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    className='menu_item'
                    onClick={() => setItemType("pizza")}>
                    Pizza
                  </MenuItem>
                  <MenuItem
                    className='menu_item'
                    onClick={() => setItemType("drinks")}>
                    Drinks
                  </MenuItem>
                  <MenuItem
                    className='menu_item'
                    onClick={() => setItemType("desserts")}>
                    Desserts
                  </MenuItem>
                </MenuList>
              </Menu>

              <InputComp
                type='number'
                placeholder='Product price'
                className='form_input'
                value={price}
                handleChange={(e) => handlePrice(e)}
              />
              <FileInputComp
                handleFileChange={handleImage}
                id='add_item_img'
                prevImage={prevImage}
              />
            </Box>
          }
        />
      )}
      <Menu>
        <MenuButton as={Button} className='action_button'>
          <IoMdCreate className='action_btn_icon' />
        </MenuButton>
        <MenuList>
          <MenuItem
            className='navbar_menu_item'
            onClick={() => setOpenAddItemModal(true)}>
            Add new Item
          </MenuItem>
          <MenuItem className='navbar_menu_item'>New announcement</MenuItem>
        </MenuList>
      </Menu>

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

export default Items;
