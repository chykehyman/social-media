import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import get from 'lodash/get';

import { FETCH_POSTS } from '../utils/graphql/posts';
import PostCard from '../components/PostCard';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS);
  const posts = get(data, 'getPosts', []);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h3>Loading posts...</h3>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
