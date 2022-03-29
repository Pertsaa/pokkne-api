import bcrypt from 'bcryptjs';

import { User } from '../entities/User';
import { UserInput } from '../resolvers/types/UserInput';

const getUsers = async (): Promise<User[]> => {
  return await User.find({});
};

const addUser = async ({ username, password }: UserInput): Promise<User> => {
  const user = await User.findOne({ username });
  if (user) throw Error('Username is taken');
  const passwordHash = await bcrypt.hash(password, 10);
  return await User.create({ username, passwordHash }).save();
};

const removeUser = async (id: number): Promise<boolean> => {
  const user = await User.findOne({ id });
  if (user) await user.remove();
  return true;
};

export default { getUsers, addUser, removeUser };
