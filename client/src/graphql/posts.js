import { gql } from '@apollo/client';

export const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        username
      }
      commentCount
      likeCount
    }
  }
`;
