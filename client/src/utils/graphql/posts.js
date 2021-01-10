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

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;
