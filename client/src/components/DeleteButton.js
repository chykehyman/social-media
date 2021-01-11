import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import {
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
} from '../utils/graphql/posts';

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [handleDeletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        },
      });

      if (callback) callback();
    },
    variables: { postId },
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        dimmer="blurring"
        size="tiny"
        header="Delete Post"
        content="Are you sure you want to delete this post?"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeletePost}
      />
    </>
  );
};

export default DeleteButton;
