import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from '../../cats/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Cat, (cat) => cat.user, { eager: true })
  cats: Cat[];
}
