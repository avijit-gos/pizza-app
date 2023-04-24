/** @format */

import { Textarea } from "@chakra-ui/react";
import React from "react";

const TextareaComp = ({
  type,
  placeholder,
  value,
  className,
  handleChange,
}) => {
  return (
    <Textarea
      type={type}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextareaComp;
