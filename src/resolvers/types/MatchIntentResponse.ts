import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MathIntentResponse {
  @Field()
  intent: string;

  @Field({ nullable: true })
  response?: string;
}
