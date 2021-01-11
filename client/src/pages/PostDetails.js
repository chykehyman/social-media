import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_POST_QUERY } from '../utils/graphql/posts';
import get from 'lodash/get';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../utils/context/auth';
import DeleteButton from '../components/DeleteButton';

const PostDetails = (props) => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });
  const post = get(data, 'getPost', undefined);

  const deletePostCallback = () => props.history.push('/');

  if (loading) return <p>Loading post...</p>;
  if (post) {
    const {
      id,
      body,
      createdAt,
      username,
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
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('Comment on post')}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

export default PostDetails;
