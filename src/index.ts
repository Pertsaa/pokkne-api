import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';

import { OpinionResolver } from './resolvers/OpinionResolver';

const app = async () => {
  await createConnection({
    type: 'postgres',
    host: 'db',
    username: 'docker',
    password: 'secret',
    database: 'docker',
    synchronize: true,
    connectTimeoutMS: 10000,
    entities: ['build/entities/*.js'],
  });

  const schema = await buildSchema({
    resolvers: [OpinionResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();
  console.log(`Server running on ${url}`);
};

app();
