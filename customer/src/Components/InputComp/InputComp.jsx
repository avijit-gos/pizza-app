/** @format */

import React from "react";
import { Input } from "@chakra-ui/react";

const InputComp = ({ type, placeholder, className, value, handleChange }) => {
  return (
    <React.Fragment>
      <Input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default InputComp;
