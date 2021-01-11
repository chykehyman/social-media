import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';
import {
  CREATE_POST_MUTATION,
  FETCH_POSTS_QUERY,
} from '../utils/graphql/posts';

function PostForm() {
  const { values, handleOnchange, handleOnSubmit } = useForm(
    createPostCallback,
    {
      body: '',
    }
  );
  const [error, setError] = useState({});

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
      setError({});
    },
    onError(err) {
      if (err.graphQLErrors[0])
        setError((prevError) => ({
          ...prevError,
          code: err.graphQLErrors[0].extensions.code,
          errorMessage: err.graphQLErrors[0].message,
        }));
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  const isInputError =
    Object.keys(error).length > 0 && error.code === 'BAD_USER_INPUT';

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="enter post here..."
            name="body"
            onChange={handleOnchange}
            value={values.body}
            error={isInputError ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {Object.keys(error).length > 0 && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.errorMessage}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
