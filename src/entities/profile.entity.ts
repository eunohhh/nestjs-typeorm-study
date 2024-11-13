import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserModel, (user) => user.profile)
  // @JoinColumn() <-- 이게 양쪽에 있으면 문제 발생
  user: UserModel;

  @Column()
  profileImage: string;
}
