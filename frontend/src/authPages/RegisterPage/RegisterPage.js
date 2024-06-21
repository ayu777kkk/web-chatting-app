import React, { useEffect, useState } from "react";
import AuthBox from "../../shared/components/AuthBox";
import { Typography } from "@mui/material";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooters from "./RegisterPageFooters";
import { validateRegisterForm } from "../../shared/utils/validators";

const RegisterPage = () => {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    console.log("Registering user with mail: " + mail + " and username: " + username);
    console.log("password: " + password);
  };

  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail, username, password }));
  }, [mail, username, password, setIsFormValid]);

  return (
  <AuthBox>
    <Typography variant="h5" sx = {{ color: "white" }}>
      Create an Account
    </Typography>
    <RegisterPageInputs
      mail={mail}
      setMail={setMail}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
    <RegisterPageFooters 
      isFormValid={isFormValid}
      handleRegister={handleRegister}
    />
  </AuthBox>
  );

};

export default RegisterPage;