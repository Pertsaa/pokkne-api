import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { User } from '../entities/User';
import { UserInput } from './types/UserInput';
import { LoginResponse } from './types/LoginResponse';
import { AuthContext } from '../types';
import userService from '../services/user';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await userService.getUsers();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: AuthContext): Promise<User | undefined> {
    const user = await User.findOne({ id: ctx.userId });
    return user;
  }

  @Authorized()
  @Mutation(() => User)
  async addUser(@Arg('input') input: UserInput): Promise<User> {
    return await userService.addUser(input);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removeUser(@Arg('id') id: number): Promise<boolean> {
    return await userService.removeUser(id);
  }

  @Mutation(() => LoginResponse)
  async login(@Arg('input') input: UserInput) {
    return await userService.login(input);
  }
}
