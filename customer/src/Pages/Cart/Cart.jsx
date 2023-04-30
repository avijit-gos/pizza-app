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
import { useNavigate } from "react-router-dom";
import Address from "../../Components/ConfirmationComp/Address";
import Payment from "../../Components/ConfirmationComp/Payment";
import Placed from "../../Components/ConfirmationComp/Placed";

const Cart = () => {
  const navigate = useNavigate();
  const { setPageType, setCartItems, cartItems } = GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [details, setDetails] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [stage, setStatge] = React.useState("address");

  React.useLayoutEffect(() => {
    setPageType("cart");
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
        console.log(response.data.items);
        setCartItems(response.data.items);
        var items = [];
        var cardItemsId = [];
        var totalPrice = 0;
        for (let i = 0; i < response.data.items.length; i++) {
          items.push(response.data.items[i]._id);
          console.log(response.data.items[i]._id);
          cardItemsId.push(response.data.items[i]._id);
          totalPrice += response.data.items[i].item.price;
        }
        console.log(totalPrice);
        setDetails({
          ...details,
          price: totalPrice,
          items: JSON.stringify(items),
          cardItemsId: JSON.stringify(cardItemsId),
        });
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

  return (
    <Layout pageTitle='Cart'>
      <Box className='cart_section'>
        {/* Confirmation modal for plaing the order */}
        {openModal && (
          <ModalComp
            onClose={onClose}
            isOpen={openModal}
            title={
              <>
                {stage === "address" ? (
                  <Box className='confirmation_modal_title'>
                    Confirm address
                  </Box>
                ) : (
                  <>
                    {stage === "payment" ? (
                      <Box className='confirmation_modal_title'>
                        Confirm payment
                      </Box>
                    ) : (
                      <>
                        {stage === "confirm" ? (
                          <Box className='confirmation_modal_title'>
                            Confirm order
                          </Box>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </>
            }
            body={
              <Box>
                {stage === "address" ? (
                  <Address
                    setStatge={setStatge}
                    setDetails={setDetails}
                    details={details}
                  />
                ) : (
                  <>
                    {stage === "payment" ? (
                      <Payment
                        setStatge={setStatge}
                        setDetails={setDetails}
                        details={details}
                      />
                    ) : (
                      <Placed
                        setStatge={setStatge}
                        setDetails={setDetails}
                        details={details}
                      />
                    )}
                  </>
                )}
              </Box>
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
