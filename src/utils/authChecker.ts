import { AuthChecker } from 'type-graphql';
import { AuthContext } from '../types';

export const authChecker: AuthChecker<AuthContext> = ({ context: { userId } }) => {
  return !!userId;
};
