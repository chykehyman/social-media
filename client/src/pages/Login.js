import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/graphql/user';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../utils/context/auth';

const Login = (props) => {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const { handleOnchange, handleOnSubmit, values } = useForm(loginUser, {
    username: '',
    password: '',
  });

  const [signInUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.setAuthUser(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function loginUser() {
    signInUser();
  }

  const { username, password } = values;
  return (
    <div className="form-container">
      <Form
        onSubmit={handleOnSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Login</h1>
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
          label="Password"
          name="password"
          type="password"
          placeholder="enter password here..."
          value={password}
          error={errors.password ? true : false}
          onChange={handleOnchange}
        />
        <Button type="submit" primary>
          Login
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

export default Login;
