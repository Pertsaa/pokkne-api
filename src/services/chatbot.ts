import { Chatbot } from '../entities/Chatbot';
import { Intent } from '../entities/Intent';
import { ChatbotInput } from '../resolvers/types/ChatbotInput';

const getChatbots = async (): Promise<Chatbot[]> => {
  const chatbots = await Chatbot.find({ relations: ['intents'] });
  return chatbots;
};

const addChatbot = async (chatbotInput: ChatbotInput): Promise<Chatbot> => {
  const chatbot = Chatbot.create({ ...chatbotInput });
  return await chatbot.save();
};

const removeChatbot = async (id: number): Promise<boolean> => {
  const chatbot = await Chatbot.findOne({ id });
  if (chatbot) await chatbot.remove();
  return true;
};

const renameChatbot = async (id: number, newName: string): Promise<Chatbot> => {
  const chatbot = await Chatbot.findOne({ id });
  if (!chatbot) throw Error(`No chatbot with id: ${id}`);
  chatbot.name = newName;
  return await chatbot.save();
};

const addIntentToChatbot = async (intentId: number, chatbotId: number): Promise<Chatbot> => {
  const chatbot = await Chatbot.findOne({ id: chatbotId }, { relations: ['intents'] });
  if (!chatbot) throw Error(`No chatbot with id: ${chatbotId}`);
  const intent = await Intent.findOne({ id: intentId });
  if (!intent) throw Error(`No intent with id: ${intentId}`);

  chatbot.intents = [...chatbot.intents, intent];
  return await chatbot.save();
};

const removeIntentFromChatbot = async (intentId: number, chatbotId: number): Promise<Chatbot> => {
  const chatbot = await Chatbot.findOne({ id: chatbotId }, { relations: ['intents'] });
  if (!chatbot) throw Error(`No chatbot with id: ${chatbotId}`);
  const intent = await Intent.findOne({ id: intentId });
  if (!intent) throw Error(`No intent with id: ${intentId}`);

  chatbot.intents = chatbot.intents.filter((i) => i.id !== intentId);
  return await chatbot.save();
};

export default { getChatbots, addChatbot, removeChatbot, renameChatbot, addIntentToChatbot, removeIntentFromChatbot };
