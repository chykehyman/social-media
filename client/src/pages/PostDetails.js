import React, { useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FETCH_POST_QUERY } from '../utils/graphql/posts';
import get from 'lodash/get';
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
  Loader,
  Message,
} from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../utils/context/auth';
import DeleteButton from '../components/DeleteButton';
import { CREATE_COMMENT_MUTATION } from '../utils/graphql/comments';
import ToolTip from '../utils/Tooltip';

const PostDetails = (props) => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });
  const post = get(data, 'getPost', undefined);

  const [handleCreateComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: { postId, body: comment },
  });

  const deletePostCallback = () => props.history.push('/');

  if (loading) return <Loader active size="large" className="loader-margin" />;
  if (post) {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = post;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <ToolTip content="Comments">
                  <Button as="div" labelPosition="right">
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </ToolTip>
                {user && user.username === username && (
                  <DeleteButton
                    postId={id}
                    callback={deletePostCallback}
                    field="Post"
                  />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <Button
                        type="submit"
                        color="teal"
                        disabled={comment.trim() === ''}
                        onClick={handleCreateComment}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton
                        postId={id}
                        commentId={comment.id}
                        field="Comment"
                      />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Grid.Column>
                <Message warning size="huge">
                  <Message.Header>
                    <Icon name="alarm" /> Oppss!!!
                  </Message.Header>
                  {user ? (
                    <Message.List>
                      No Comments yet. Be the first to comment
                    </Message.List>
                  ) : (
                    <Message.List>
                      No Comments available for this post yet
                    </Message.List>
                  )}
                </Message>
              </Grid.Column>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

export default PostDetails;
