import { ApolloServer } from 'apollo-server';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';

import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';

dotEnv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server running at ${res.url}`))
  .catch((error) => console.log('An error occurred: ', error.message));
