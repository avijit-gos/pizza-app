/** @format */

import React from "react";
import { GlobalContext } from "../../Context/Context";
import Layout from "../../Layout/Layout";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import SkeletonLoader from "../../Components/Loaders/SkeletonLoader/SkeletonLoader";
import ModalComp from "../../Components/ModalComp/ModalComp";
import CartItemComp from "../../Components/ItemComp/CartItemComp";
import { calculateTotlaPrice } from "../../Utils/calculateTotalPrice";

const Cart = () => {
  const { setPageType, setCartItems, setCartCount, cartItems, cartCount } =
    GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [stepsCount, setStepCount] = React.useState(0);
  const [steps, setSteps] = React.useState([]);

  React.useLayoutEffect(() => {
    setPageType("home");
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/fetch/cart`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setCartItems(response.data.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    const result = calculateTotlaPrice(cartItems);
    setTotalPrice(result);
  }, [cartItems]);

  const onClose = () => {
    setOpenModal(false);
  };

  const lists = [
    { name: "Address", value: 1 },
    { name: "Payment", value: 2 },
    { name: "Confirm", value: 3 },
  ];

  const handleNextStep = (data) => {
    setStepCount((data.value - 1) * 45);
    setSteps((prev) => [...prev, data.name]);
  };

  return (
    <Layout>
      <Box className='cart_section'>
        {openModal && (
          <ModalComp
            isOpen={openModal}
            onClose={onClose}
            title={
              <Box className='stepper_form_modal_title_section'>
                <Box
                  className='progress_status'
                  style={{ width: `${stepsCount}%` }}></Box>
                {(lists || []).length > 0 && (
                  <Box className='step_count_section'>
                    {lists.map((data) => (
                      <Box className='step_count' key={data.value}>
                        <Box
                          className={
                            steps.includes(data.name)
                              ? "step_number_count complete_step_number_count"
                              : "step_number_count"
                          }></Box>
                        <Box className='step_title'>{data.name}</Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            }
            footer={
              (lists || []).length > 0 && (
                <>
                  {lists.map((data) => (
                    <Button
                      key={data.value}
                      onClick={() => handleNextStep(data)}>
                      {data.name}
                    </Button>
                  ))}
                </>
              )
            }
          />
        )}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Box className='cart_card_section'>
            {(cartItems || []).length > 0 ? (
              <Box className='cart_items_section'>
                {cartItems.map((data) => (
                  <CartItemComp key={data._id} item={data} />
                ))}
              </Box>
            ) : (
              <Box className='empty_cart'>No item in cart</Box>
            )}
          </Box>
        )}
        {totalPrice > 0 && (
          <Button className='place_btn' onClick={() => setOpenModal(true)}>
            Total amount ₹ {totalPrice}
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default Cart;
