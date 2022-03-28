import { Field, ID, ObjectType } from 'type-graphql';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Intent } from './Intent';

@ObjectType()
@Entity()
export class Chatbot extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column('text', { unique: true })
  title: string;

  @Field()
  @Column('text')
  name: string;

  @Field(() => [Intent])
  @ManyToMany(() => Intent)
  @JoinTable()
  intents: Intent[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.intents) this.intents = [];
  }
}
