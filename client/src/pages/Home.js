import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Icon, Loader, Message, Transition } from 'semantic-ui-react';
import get from 'lodash/get';

import { FETCH_POSTS_QUERY } from '../utils/graphql/posts';
import { AuthContext } from '../utils/context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = get(data, 'getPosts', []);
  let postsSectionStyle = {
    display: 'flex',
    flex: '1 1',
    marginBottom: 20,
    justifyContent: 'center',
  };
  if (loading) postsSectionStyle.marginTop = 45;
  if (user && posts.length === 0) delete postsSectionStyle.flex;
  if (posts.length > 0) {
    postsSectionStyle = { marginBottom: 20 };
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Grid.Column style={postsSectionStyle}>
            <Loader active size="large" />
          </Grid.Column>
        ) : posts.length > 0 ? (
          <Transition.Group>
            {posts.map((post) => (
              <Grid.Column key={post.id} style={postsSectionStyle}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        ) : (
          <Grid.Column style={postsSectionStyle}>
            <Message warning size="huge">
              <Message.Header>
                <Icon name="alarm" /> Oppss!!!
              </Message.Header>
              <Message.List>No posts available yet</Message.List>
            </Message>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
