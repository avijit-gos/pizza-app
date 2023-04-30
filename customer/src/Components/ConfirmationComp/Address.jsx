/** @format */

import { Box } from "@chakra-ui/react";
import React from "react";
import InputComp from "../InputComp/InputComp";
import AuthButton from "../ButtonComp/AuthButton";

const Address = ({ setStatge, setDetails, details }) => {
  const [location, setLoaction] = React.useState("");
  const [phn, setPhn] = React.useState(0);
  const [landmark, setLandmark] = React.useState("");
  const [pin, setPin] = React.useState(0);
  const [lat, setLat] = React.useState(0);
  const [lan, setLan] = React.useState(0);
  const [isDisable, setIsDisable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!location.trim() || !landmark.trim() || phn <= 0 || pin <= 0) {
      console.log("Disable true");
      setIsDisable(true);
    } else {
      console.log("Disable false");
      setIsDisable(false);
    }
  }, [location, landmark, phn, pin]);

  const handleConfirmAddress = () => {
    setIsLoading(true);
    setStatge("payment");
    setDetails({
      ...details,
      location,
      phn,
      landmark,
      pin,
    });
    setIsLoading(false);
    setIsDisable(true);
  };

  return (
    <Box>
      <InputComp
        type='text'
        placeholder='Enter your location'
        className='form_input'
        value={location}
        handleChange={(e) => setLoaction(e.target.value)}
      />
      <InputComp
        type='number'
        placeholder='Enter your phone number'
        className='form_input'
        value={phn}
        handleChange={(e) => setPhn(e.target.value)}
      />
      <InputComp
        type='text'
        placeholder='Enter landmark'
        className='form_input'
        value={landmark}
        handleChange={(e) => setLandmark(e.target.value)}
      />
      <InputComp
        type='number'
        placeholder='Enter pincode'
        className='form_input'
        value={pin}
        handleChange={(e) => setPin(e.target.value)}
      />

      <AuthButton
        isDisable={isDisable}
        auth_btn='auth_btn'
        disableClassName='disable_auth_btn'
        text='Confirm'
        isLoading={isLoading}
        handleClick={handleConfirmAddress}
      />
    </Box>
  );
};

export default Address;
