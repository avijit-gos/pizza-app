/** @format */

import { useToast } from "@chakra-ui/react";
import AuthButton from "../ButtonComp/AuthButton";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Placed = ({ setStatge, setDetails, details }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReplaced, setIsReplace] = React.useState(false);

  const handleConfirmOrder = () => {
    setIsLoading(true);
    let data = JSON.stringify({
      details: JSON.stringify(details),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/item/order`,
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
        toast({
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
        setDetails(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      {isReplaced ? (
        <>Success gif</>
      ) : (
        <AuthButton
          isDisable={isDisable}
          auth_btn='auth_btn'
          disableClassName='disable_auth_btn'
          text='Confirm'
          isLoading={isLoading}
          handleClick={handleConfirmOrder}
        />
      )}
    </React.Fragment>
  );
};

export default Placed;
