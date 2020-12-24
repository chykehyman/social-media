import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { FETCH_POSTS } from '../../graphql/posts';
import PostCard from '../PostCard';

const Home = () => {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS);

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
