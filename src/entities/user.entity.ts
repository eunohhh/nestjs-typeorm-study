import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { PostModel } from './post.entity';
import { ProfileModel } from './profile.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class UserModel {
  // 자동생성 안하는 버전으로는 PrimaryGeneratedColumn 대신 PrimaryColumn 사용
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  // @Column({
  //   type: 'varchar',
  //   name: 'title',
  //   length: 300,
  //   nullable: true,
  //   // true 면 처음 저장할 때만 값 지정 가능
  //   // 이후에는 값 변경 불가능
  //   update: true,
  //   // find() 를 실행할 때 기본으로 값을 불러올지 말지
  //   // 기본값은 true
  //   select: true,
  //   // 기본값 설정
  //   // 아무것도 입력하지 않으면 기본값으로 설정
  //   default: 'default title',
  //   // 유니크 제약조건 추가
  //   // 칼럼중에서 유일무이한 값이 되어야 하는지
  //   // 만약 바꿔보고 싶으면 postgres_data 삭제하고 docker compose up 실행
  //   unique: false,
  // })
  // title: string;

  // 데이터가 생성된 시간
  @CreateDateColumn()
  createdAt: Date;

  // 데이터가 수정된 시간
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 생성될 때마다 1씩 증가한다
  // 데이터 버전 관리에 사용
  // 처음 생성되면 값은 1이다
  // save() 함수가 몇 번 불렸는지 기록
  @VersionColumn()
  version: number;

  @Column()
  @Generated('increment')
  additionalId: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행할 때마다 항상 같이 가져올 relation
    eager: true,
    // 저장할 때 relation 을 한번에 같이 저장가능
    cascade: true,
    // nullable 기본값 true
    nullable: true,
    // 관계가 삭제되었을 때
    // no action -> 아무것도 안함
    // cascade -> 참조하는 row 도 같이 삭제
    // set null -> 참조하는 row 에서 참조 id 를 null 로 변경
    // set default -> 기본 세팅으로 설정(테이블의 기본 세팅)
    // restrict -> 참조하고 있는 row 가 있는 경우 참조당하는 row 삭제 불가
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
