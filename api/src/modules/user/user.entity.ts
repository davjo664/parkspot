import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {UserLevel} from './user-level.enum';
import {SubscriptionEntity} from '../subscription/subscription.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  mail: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  @Column({select: false, length: 60})
  password?: string;

  @Column({type: 'integer', default: UserLevel.PrivateUser})
  userLevel: UserLevel;

  @OneToMany(type => SubscriptionEntity, subscription => subscription.user)
  subscriptions: SubscriptionEntity[];

}
