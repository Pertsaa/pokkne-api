import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

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
  if (!user) return true;
  if (user.username === config.ROOT_USERNAME) return false;
  await user.remove();
  return true;
};

const login = async ({ username, password }: UserInput) => {
  const user = await User.findOne({ username });
  if (!user) throw Error('Invalid username or password');
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw Error('Invalid username or password');
  const accessToken = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: '30m' });
  return { accessToken };
};

export default { getUsers, addUser, removeUser, login };
