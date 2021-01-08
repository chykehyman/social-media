import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleOnchange = ({ target: { name, value } }) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    handleOnchange,
    handleOnSubmit,
    values,
  };
};
