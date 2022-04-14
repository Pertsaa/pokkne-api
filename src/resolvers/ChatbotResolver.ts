import { Arg, Authorized, ID, Mutation, Query, Resolver } from 'type-graphql';

import { Chatbot } from '../entities/Chatbot';
import { ChatbotInput } from './types/ChatbotInput';
import { MathIntentResponse } from './types/MatchIntentResponse';
import chatbotService from '../services/chatbot';

@Resolver(() => Chatbot)
export class ChatbotResolver {
  @Authorized()
  @Query(() => [Chatbot])
  async chatbots(): Promise<Chatbot[]> {
    return await chatbotService.getChatbots();
  }

  @Authorized()
  @Query(() => MathIntentResponse)
  async matchIntent(
    @Arg('chatbotId', () => ID) chatbotId: number,
    @Arg('query') query: string,
  ): Promise<MathIntentResponse> {
    return await chatbotService.matchIntentToQuery(chatbotId, query);
  }

  @Authorized()
  @Mutation(() => Chatbot)
  async addChatbot(@Arg('chatbot') chatbotInput: ChatbotInput): Promise<Chatbot> {
    return await chatbotService.addChatbot(chatbotInput);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removeChatbot(@Arg('id', () => ID) id: number): Promise<boolean> {
    return await chatbotService.removeChatbot(id);
  }

  @Authorized()
  @Mutation(() => Chatbot)
  async renameChatbot(@Arg('id', () => ID) id: number, @Arg('newName') newName: string): Promise<Chatbot> {
    return await chatbotService.renameChatbot(id, newName);
  }

  @Authorized()
  @Mutation(() => Chatbot)
  async addIntentToChatbot(
    @Arg('intentId', () => ID) intentId: number,
    @Arg('chatbotId', () => ID) chatbotId: number,
  ): Promise<Chatbot> {
    return await chatbotService.addIntentToChatbot(intentId, chatbotId);
  }

  @Authorized()
  @Mutation(() => Chatbot)
  async removeIntentFromChatbot(
    @Arg('intentId', () => ID) intentId: number,
    @Arg('chatbotId', () => ID) chatbotId: number,
  ): Promise<Chatbot> {
    return await chatbotService.removeIntentFromChatbot(intentId, chatbotId);
  }
}
