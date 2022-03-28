import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { connectDb } from './utils/db';
import { IntentResolver } from './resolvers/IntentResolver';

const app = async () => {
  await connectDb();

  const schema = await buildSchema({
    resolvers: [IntentResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();
  console.log(`Server running on ${url}`);
};

app();
