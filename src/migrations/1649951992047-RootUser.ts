import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities/User';
import userService from '../services/user';
import config from '../config';

export class RootUser1649951992047 implements MigrationInterface {
  async up(_queryRunner: QueryRunner): Promise<void> {
    await userService.addUser({ username: config.ROOT_USERNAME, password: config.ROOT_PASSWORD });
  }

  async down(_queryRunner: QueryRunner): Promise<void> {
    const user = await User.findOne({ username: config.ROOT_USERNAME });
    if (user) await userService.removeUser(user.id);
  }
}
