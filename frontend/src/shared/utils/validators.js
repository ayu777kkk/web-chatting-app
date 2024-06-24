export const validateLoginForm = ({ mail, password }) => {    
    return validateMail(mail) && validatePassword(password);
};

export const validateRegisterForm = ({ mail, username, password }) => {
    return validateMail(mail) && validatePassword(password) && validateUsername(username);
};

const validatePassword = (password) => {
    return password.length >= 6 && password.length <= 12;
};

export const validateMail = (mail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(mail);
};

const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 12;
};