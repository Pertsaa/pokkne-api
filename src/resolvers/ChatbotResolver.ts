import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';

import { Chatbot } from '../entities/Chatbot';
import { ChatbotInput } from './types/ChatbotInput';
import chatbotService from '../services/chatbot';

@Resolver(() => Chatbot)
export class ChatbotResolver {
  @Query(() => [Chatbot])
  async chatbots(): Promise<Chatbot[]> {
    return await chatbotService.getChatbots();
  }

  @Mutation(() => Chatbot)
  async addChatbot(@Arg('chatbot') chatbotInput: ChatbotInput): Promise<Chatbot> {
    return await chatbotService.addChatbot(chatbotInput);
  }

  @Mutation(() => Boolean)
  async removeChatbot(@Arg('id', () => ID) id: number): Promise<boolean> {
    return await chatbotService.removeChatbot(id);
  }

  @Mutation(() => Chatbot)
  async renameChatbot(@Arg('id', () => ID) id: number, @Arg('newName') newName: string): Promise<Chatbot> {
    return await chatbotService.renameChatbot(id, newName);
  }

  @Mutation(() => Chatbot)
  async addIntentToChatbot(
    @Arg('intentId', () => ID) intentId: number,
    @Arg('chatbotId', () => ID) chatbotId: number,
  ): Promise<Chatbot> {
    return await chatbotService.addIntentToChatbot(intentId, chatbotId);
  }

  @Mutation(() => Chatbot)
  async removeIntentFromChatbot(
    @Arg('intentId', () => ID) intentId: number,
    @Arg('chatbotId', () => ID) chatbotId: number,
  ): Promise<Chatbot> {
    return await chatbotService.removeIntentFromChatbot(intentId, chatbotId);
  }
}
