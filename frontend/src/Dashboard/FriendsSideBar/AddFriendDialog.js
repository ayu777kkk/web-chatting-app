import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Typography } from "@mui/material";
import InputWithLabel from "../../shared/components/InputWithLabel";
import { validateMail } from "../../shared/utils/validators";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";

const AddFriendDialog = ({ 
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation = () => {},
}) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendInvitation= () => {
    //
  };
  
  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  return <div>
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
            <Typography>Invite a friend</Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                <Typography>
                    Enter an email address to invite a friend to join your chat room.
                </Typography>
                <InputWithLabel
                  label='Mail'
                  type='text'
                  value={mail}
                  setValue={setMail}
                  placeHolder='Enter email address'/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <CustomPrimaryButton 
              onClick={handleSendInvitation}
              disabled={!isFormValid}
              label='Send'
              additionalStyles={{
                marginRight: '15px',
                marginLeft: '15px',
                marginBottom: '10px',
              }}
            />
        </DialogActions>
    </Dialog>
  </div>;
};  

export default AddFriendDialog;