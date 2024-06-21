import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Please enter valid email and password. Password should contains between 8 to 20 characters!";
  // "Please enter valid email and password should contains between 6 to 12 characters and should not contain any special characters or numbers!"
};

const getFormValidMessage = () => {
  return "Log in to continue!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {

    const navigate = useNavigate();
    
    const handlePushToRegisterPage = () => {
        navigate('/register');
    };

  return (
    <>
    <Tooltip
      title={!isFormValid? getFormNotValidMessage() : getFormValidMessage()}
    >
    <div>
        <CustomPrimaryButton 
          label="log in"
          additionalStyles={{marginTop: "30px"}}
          disabled={!isFormValid}
          onClick={handleLogin}
        />
    </div>
    </Tooltip>
    <RedirectInfo 
      text='Need an account? '
      redirectText='Create an account'
      additionalStyles={{marginTop: "5px"}}
      redirectHandler={handlePushToRegisterPage}
    />
    </>
    );

};  

export default LoginPageFooter;