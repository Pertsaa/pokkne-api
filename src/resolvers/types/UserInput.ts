import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @MinLength(3)
  @Field()
  username: string;

  @MinLength(8)
  @Field()
  password: string;
}
