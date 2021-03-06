import { Arg, Authorized, ID, Mutation, Query, Resolver } from 'type-graphql';

import { Intent } from '../entities/Intent';
import { IntentInput } from './types/IntentInput';
import intentService from '../services/intent';

@Resolver(() => Intent)
export class IntentResolver {
  @Authorized()
  @Query(() => [Intent])
  async intents() {
    return await intentService.getIntents();
  }

  @Authorized()
  @Mutation(() => Intent)
  async addIntent(@Arg('intent') intentInput: IntentInput): Promise<Intent> {
    return await intentService.addIntent(intentInput);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removeIntent(@Arg('id', () => ID) id: number): Promise<boolean> {
    return await intentService.removeIntent(id);
  }

  @Authorized()
  @Mutation(() => Intent)
  async setExamples(
    @Arg('id', () => ID) intentId: number,
    @Arg('examples', () => [String]) examples: string[],
  ): Promise<Intent> {
    return await intentService.setExamples(intentId, examples);
  }

  @Authorized()
  @Mutation(() => Intent)
  async setResponses(
    @Arg('id', () => ID) intentId: number,
    @Arg('responses', () => [String]) responses: string[],
  ): Promise<Intent> {
    return await intentService.setResponses(intentId, responses);
  }
}
