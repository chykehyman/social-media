import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import get from 'lodash/get';

import { FETCH_POSTS_QUERY } from '../utils/graphql/posts';
import { AuthContext } from '../utils/context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = get(data, 'getPosts', []);

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
          <h3>Loading posts...</h3>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
