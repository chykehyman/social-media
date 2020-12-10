import gql from 'graphql-tag';

export default gql`
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  type Query {
    sayHi: String!
    getPosts: [Post]
  }
`;
