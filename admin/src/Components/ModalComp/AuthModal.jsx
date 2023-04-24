/** @format */

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const AuthModal = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  modal_content_body,
  modal,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={modal}>
      <ModalOverlay />
      <ModalContent className={modal_content_body}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
