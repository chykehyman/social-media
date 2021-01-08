import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/graphql/user';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../utils/context/auth';

const Register = (props) => {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const { handleOnchange, handleOnSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(SIGNUP_USER, {
    update(proxy, { data: { signup: userData } }) {
      context.setAuthUser(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function registerUser() {
    addUser();
  }

  const { username, email, password, confirmPassword } = values;
  return (
    <div className="form-container">
      <Form
        onSubmit={handleOnSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Register</h1>
        <Form.Input
          label="Username"
          name="username"
          type="text"
          placeholder="enter username here..."
          value={username}
          error={errors.username ? true : false}
          onChange={handleOnchange}
        />
        <Form.Input
          label="Email"
          name="email"
          type="email"
          placeholder="enter email here..."
          value={email}
          error={errors.email ? true : false}
          onChange={handleOnchange}
        />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          placeholder="enter password here..."
          value={password}
          error={errors.password ? true : false}
          onChange={handleOnchange}
        />
        <Form.Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="enter password again..."
          value={confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleOnchange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Register;
