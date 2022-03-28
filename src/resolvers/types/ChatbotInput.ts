import { InputType, Field } from 'type-graphql';

import { Chatbot } from '../../entities/Chatbot';

@InputType()
export class ChatbotInput implements Partial<Chatbot> {
  @Field()
  title: string;

  @Field({ nullable: true })
  name: string;
}
