import { Query, Resolver } from 'type-graphql';

@Resolver()
export class OpinionResolver {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  @Query(() => String!)
  opinion() {
    return 'Opinion';
  }
}
