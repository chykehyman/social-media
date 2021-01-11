import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { DELETE_COMMENT_MUTATION } from '../utils/graphql/comments';
import {
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
} from '../utils/graphql/posts';
import ToolTip from '../utils/Tooltip';

const DeleteButton = ({ postId, commentId, field, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [handleDeleteMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: data.getPosts.filter((post) => post.id !== postId),
          },
        });
      }

      if (callback) callback();
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <ToolTip content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </ToolTip>
      <Confirm
        dimmer="blurring"
        size="tiny"
        header={`Delete ${field}`}
        content={`Are you sure you want to delete this ${field.toLowerCase()}?`}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteMutation}
      />
    </>
  );
};

export default DeleteButton;
