import { Intent } from '../entities/Intent';
import { IntentInput } from '../resolvers/types/IntentInput';

const getIntents = async (): Promise<Intent[]> => {
  const intents = await Intent.find({});
  return intents;
};

const addIntent = async (intentInput: IntentInput): Promise<Intent> => {
  const intent = Intent.create({ ...intentInput });
  return await intent.save();
};

const removeIntent = async (id: number): Promise<boolean> => {
  const intent = await Intent.findOne({ id });
  if (intent) await intent.remove();
  return true;
};

const setExamples = async (id: number, examples: string[]) => {
  const intent = await Intent.findOne({ id });
  if (!intent) throw Error(`No intent with id ${id}`);
  intent.examples = examples;
  return await intent.save();
};

const setResponses = async (id: number, responses: string[]) => {
  const intent = await Intent.findOne({ id });
  if (!intent) throw Error(`No intent with id ${id}`);
  intent.responses = responses;
  return await intent.save();
};

export default { getIntents, addIntent, removeIntent, setExamples, setResponses };
