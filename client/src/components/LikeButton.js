import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import { LIKE_POST_MUTATION } from '../utils/graphql/posts';

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username))
      setLiked(true);
    else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    update() {},
    variables: { postId: id },
  });

  const HeartButton = (props) => (
    <Button {...props}>
      <Icon name="heart" />
    </Button>
  );

  const likeButton = user ? (
    liked ? (
      <HeartButton color="teal" />
    ) : (
      <HeartButton color="teal" basic />
    )
  ) : (
    <HeartButton as={Link} to="/login" color="teal" basic />
    );

  const handleLikePost = () => {
    likePost();
  };
  return (
    <Button as="div" labelPosition="right" onClick={handleLikePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
