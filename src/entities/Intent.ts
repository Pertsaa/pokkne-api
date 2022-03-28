import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Intent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column('text', { unique: true })
  name: string;

  @Field(() => [String])
  @Column('text', { array: true })
  examples: string[] = [];

  @Field(() => [String])
  @Column('text', { array: true })
  responses: string[] = [];
}
