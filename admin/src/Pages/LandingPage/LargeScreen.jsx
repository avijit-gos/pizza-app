/** @format */

import React from "react";
import { Box, Button, Img } from "@chakra-ui/react";
import Logo from "../../Assets/logo.png";
import Landing from "../../Assets/landing.png";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import Arrow from "../../Assets/undraw_arrow.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthModal from "../../Components/ModalComp/AuthModal";
import InputComp from "../../Components/InputComp/InputComp";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import AuthButton from "../../Components/ButtonComp/AuthButton";

const LargeScreen = () => {
  const navigate = useNavigate();
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable2, setIsDisable2] = React.useState(true);
  const [isDisable, setIsDisable] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errmsg, setErrmsg] = React.useState("");

  // *** Handle change name
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // *** Handle change email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // *** Handle change password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [name, email, password]);

  React.useEffect(() => {
    if (!email.trim() || !password.trim()) {
      setIsDisable2(true);
    } else {
      setIsDisable2(false);
    }
  }, [name, email, password]);

  // *** Handle Register new user
  const handleRegister = () => {
    setIsLoading(true);
    let data = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate("/");
        setIsLoading(false);
        setIsDisable(false);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setErrmsg(error.response.data.error.message);
        setIsLoading(false);
        setIsDisable(false);
        setName("");
        setEmail("");
        setPassword("");
      });
  };

  // *** Handle login for user
  const handleLogin = () => {
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate("/");
        navigate("/");
        setIsLoading(false);
        setIsDisable(false);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setErrmsg(error.response.data.error.message);
        setIsLoading(false);
        setIsDisable(false);
        setName("");
        setEmail("");
        setPassword("");
      });
  };

  // *** Handle close modal
  const onClose = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(false);
  };

  return (
    <Box className='large_landing_page'>
      {openRegisterModal && (
        <AuthModal
          isOpen={openRegisterModal}
          onClose={onClose}
          title={<>SignUp</>}
          body={
            <Box className='auth_modal_body'>
              {errmsg && <span className='auth_error_msg'>{errmsg}</span>}
              {/* Name */}
              <Box className='form_input_section'>
                <span className='input_icon'>
                  <AiOutlineUser />
                </span>
                <InputComp
                  type='text'
                  placeholder='Enter name'
                  className='auth_input'
                  value={name}
                  handleChange={(e) => handleNameChange(e)}
                />
              </Box>

              {/* Email */}
              <Box className='form_input_section'>
                <span className='input_icon'>
                  <AiOutlineLock />
                </span>
                <InputComp
                  type='email'
                  placeholder='Enter email'
                  className='auth_input'
                  value={email}
                  handleChange={(e) => handleEmailChange(e)}
                />
              </Box>

              {/* Password */}
              <Box className='form_input_section'>
                <span className='input_icon'>
                  <AiOutlineUser />
                </span>
                <InputComp
                  type='password'
                  placeholder='Enter password'
                  className='auth_input'
                  value={password}
                  handleChange={(e) => handlePasswordChange(e)}
                />
              </Box>
            </Box>
          }
          footer={
            <Box className='auth_btn_section'>
              <AuthButton
                auth_btn='auth_btn'
                disableClassName='disable_auth_btn'
                text='SignUp'
                isLoading={isLoading}
                isDisable={isDisable}
                handleClick={handleRegister}
              />
            </Box>
          }
        />
      )}

      {openLoginModal && (
        <AuthModal
          isOpen={openLoginModal}
          onClose={onClose}
          title={<>Login</>}
          body={
            <Box className='auth_modal_body'>
              {errmsg && <span className='auth_error_msg'>{errmsg}</span>}

              {/* Email */}
              <Box className='form_input_section'>
                <span className='input_icon'>
                  <AiOutlineLock />
                </span>
                <InputComp
                  type='email'
                  placeholder='Enter email'
                  className='auth_input'
                  value={email}
                  handleChange={(e) => handleEmailChange(e)}
                />
              </Box>

              {/* Password */}
              <Box className='form_input_section'>
                <span className='input_icon'>
                  <AiOutlineUser />
                </span>
                <InputComp
                  type='password'
                  placeholder='Enter password'
                  className='auth_input'
                  value={password}
                  handleChange={(e) => handlePasswordChange(e)}
                />
              </Box>
            </Box>
          }
          footer={
            <Box className='auth_btn_section'>
              <AuthButton
                auth_btn='auth_btn'
                disableClassName='disable_auth_btn'
                text='LogIn'
                isLoading={isLoading}
                isDisable={isDisable2}
                handleClick={handleLogin}
              />
            </Box>
          }
        />
      )}
      {/* Navbar */}
      <Box className='large_screen_navbar'>
        <Box className='app_info'>
          <Img src={Logo} className='logo_image' />
          <span className='app_name'>Fresh</span>
        </Box>
      </Box>

      {/* Landing page */}
      <Box className='landing_boxs'>
        <Box className='landing_box_one'>
          <Box className='landing_tag_section'>
            <span className='tag_title_one'>
              True <span className='spcl_tag'>italian</span> taste.
            </span>
            <br />
            <span className='tag_title_two'>
              Delivary at the speed of <span className='spcl_tag'>flash.</span>
            </span>
            <Box className='sub_tag'>
              Delicious thin crust pizza, flavour-packed starters and exquisite
              cocktails.
              <br /> Delivering the passion and truly italian tast right into
              your heart.
            </Box>

            <Box className='button_group'>
              <ButtonComp
                className='landing_btn login_landing_btn'
                text='Login'
                handleClick={() => setOpenLoginModal(true)}
              />
              <ButtonComp
                className='landing_btn register_landing_btn'
                text='SignUp'
                handleClick={() => setOpenRegisterModal(true)}
              />
            </Box>
          </Box>
        </Box>
        <Box className='landing_box_two'>
          <Box className='landing_image_section'>
            <Img src={Landing} className='landing_image' />
            <Img src={Arrow} className='arrow_icon' />
            <span className='tag_text'>Yammy!!</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LargeScreen;
