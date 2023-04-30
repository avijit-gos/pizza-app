/** @format */

import { Box, Radio, RadioGroup } from "@chakra-ui/react";
import AuthButton from "../ButtonComp/AuthButton";
import React from "react";

const Payment = ({ setStatge, setDetails, details }) => {
  const [value, setValue] = React.useState("cod");
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmPayment = () => {
    setIsLoading(true);
    setStatge("confirm");
    if (value === "cod") {
      setDetails({
        ...details,
        payment: value,
      });
      setIsLoading(false);
      setIsDisable(true);
    } else {
      // do something when user choose online transction
    }
  };

  return (
    <Box>
      <RadioGroup className='radio_group' onChange={setValue} value={value}>
        <Radio value='cod' className='radio'>
          <span className='label_text'>Cash on delivery(COD)</span>
        </Radio>
        <br />
        <Radio value='online' className='radio'>
          <span className='label_text'>Online</span>
        </Radio>
      </RadioGroup>

      <AuthButton
        isDisable={isDisable}
        auth_btn='auth_btn'
        disableClassName='disable_auth_btn'
        text='Confirm'
        isLoading={isLoading}
        handleClick={handleConfirmPayment}
      />
    </Box>
  );
};

export default Payment;
