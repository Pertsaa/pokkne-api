import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { connectDb } from './utils/db';
import { OpinionResolver } from './resolvers/OpinionResolver';

const app = async () => {
  await connectDb();

  const schema = await buildSchema({
    resolvers: [OpinionResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();
  console.log(`Server running on ${url}`);
};

app();
