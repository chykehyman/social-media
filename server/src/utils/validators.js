const trimInput = (errObj, value, errKey) => {
  const firstChar = errKey.charAt(0);
  if (value.trim() === '') {
    errObj[errKey] = `${errKey.replace(
      firstChar,
      firstChar.toUpperCase()
    )} must not be empty`;
    return false;
  }
  return true;
};

export const validateSignupInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  trimInput(errors, username, 'username');
  if (trimInput(errors, email, 'email')) {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email address is not valid';
    }
  }
  if (trimInput(errors, password, 'password')) {
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export const validateLoginInput = (username, password) => {
  const errors = {};
  trimInput(errors, username, 'username');
  trimInput(errors, password, 'password');

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
