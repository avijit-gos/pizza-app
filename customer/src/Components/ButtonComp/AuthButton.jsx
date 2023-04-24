/** @format */
import { Button, Spinner } from "@chakra-ui/react";
import React from "react";

const AuthButton = ({
  isDisable,
  disableClassName,
  auth_btn,
  isLoading,
  text,
  handleClick,
}) => {
  return (
    <React.Fragment>
      {isDisable ? (
        <Button className={disableClassName}>{text}</Button>
      ) : (
        <Button className={auth_btn} onClick={handleClick}>
          {isLoading ? <Spinner /> : <>{text}</>}
        </Button>
      )}
    </React.Fragment>
  );
};

export default AuthButton;
