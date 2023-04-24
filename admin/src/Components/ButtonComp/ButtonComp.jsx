/** @format */

import { Button } from "@chakra-ui/react";
import React from "react";

const ButtonComp = ({ text, className, handleClick }) => {
  return (
    <Button className={className} onClick={handleClick}>
      {text}
    </Button>
  );
};

export default ButtonComp;
