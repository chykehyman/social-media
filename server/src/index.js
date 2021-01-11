import { ApolloServer, PubSub } from 'apollo-server';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';

import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';

dotEnv.config();
const PORT = process.env.PORT || 5000;
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return server.listen({ port: PORT });
  })
  .then((res) => console.log(`Server running at ${res.url}`))
  .catch((error) => console.log('An error occurred: ', error.message));
