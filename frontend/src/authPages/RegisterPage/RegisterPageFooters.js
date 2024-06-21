import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
    return "Please enter valid contents to continue! Username should contains between 3 to 12 characters and password should contains between 8 to 20 characters. Valid email address should be provided.";
    // "Please enter valid email and password should contains between 8 to 20 characters and should not contain any special characters or numbers!"
};

const getFormValidMessage = () => {
    return "Sign up to continue!";
};

const RegisterPageFooters = ({ handleRegister, isFormValid }) => {

    const navigate = useNavigate();
    
    const handlePushToLoginPage = () => {
        navigate('/login');
    };


    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
            >
                <div>
                    <CustomPrimaryButton
                        label="sign up"
                        additionalStyles={{ marginTop: "30px" }}
                        disabled={!isFormValid}
                        onClick={handleRegister}
                    />
                </div>
            </Tooltip>
            <RedirectInfo
                redirectText='Already have an account? '
                additionalStyles={{ marginTop: "5px" }}
                redirectHandler={handlePushToLoginPage}
            />
        </>
    );

};

export default RegisterPageFooters;