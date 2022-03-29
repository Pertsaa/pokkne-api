import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { connectDb } from './utils/db';
import { ChatbotResolver } from './resolvers/ChatbotResolver';
import { IntentResolver } from './resolvers/IntentResolver';
import { UserResolver } from './resolvers/UserResolver';

const app = async () => {
  await connectDb();

  const schema = await buildSchema({
    resolvers: [ChatbotResolver, IntentResolver, UserResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();
  console.log(`Server running on ${url}`);
};

app();
