import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { User } from '../entities/User';
import { UserInput } from './types/UserInput';
import userService from '../services/user';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await userService.getUsers();
  }

  @Mutation(() => User)
  async addUser(@Arg('input') input: UserInput): Promise<User> {
    return await userService.addUser(input);
  }

  @Mutation(() => Boolean)
  async removeUser(@Arg('id') id: number): Promise<boolean> {
    return await userService.removeUser(id);
  }
}
