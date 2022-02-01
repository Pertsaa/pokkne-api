import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { OpinionResolver } from './resolvers/OpinionResolver';

const app = async () => {
  const schema = await buildSchema({
    resolvers: [OpinionResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();
  console.log(`Server running on ${url}`);
};

app();
