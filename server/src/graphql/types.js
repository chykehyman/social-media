import gql from 'graphql-tag';

export default gql`
  input SignupInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    signup(signupInput: SignupInput): User!
    login(username: String!, password: String!): User!
  }
`;
