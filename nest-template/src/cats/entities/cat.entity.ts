import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../auth/entities';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => User, (user) => user.cats, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
