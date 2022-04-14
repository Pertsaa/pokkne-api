import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { connectDb } from './utils/db';
import { authChecker } from './utils/authChecker';
import { ChatbotResolver } from './resolvers/ChatbotResolver';
import { IntentResolver } from './resolvers/IntentResolver';
import { UserResolver } from './resolvers/UserResolver';
import { AuthContext } from './types';
import jwt from 'jsonwebtoken';
import config from './config';

const app = async () => {
  await connectDb();

  const schema = await buildSchema({
    resolvers: [ChatbotResolver, IntentResolver, UserResolver],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<AuthContext> => {
      const header = req.headers.authorization;
      if (!header) return {};
      const token = header.substring(7);
      return jwt.verify(token, config.JWT_SECRET) as AuthContext;
    },
  });

  const { url } = await server.listen();
  console.log(`Server running on ${url}`);
};

app();
