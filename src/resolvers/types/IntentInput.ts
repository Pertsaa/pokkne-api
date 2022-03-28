import { Field, InputType } from 'type-graphql';

import { Intent } from '../../entities/Intent';

@InputType()
export class IntentInput implements Partial<Intent> {
  @Field()
  name: string;
}
