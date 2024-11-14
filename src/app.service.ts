import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/post.entity';
import { ProfileModel } from './entities/profile.entity';
import { TagModel } from './entities/tag.entity';
import { UserModel } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  async getAllUsers() {
    return this.userRepository.find({
      // 필터링할 조건을 정의한다
      // 모두 and 조건임
      // 리스트에 넣어서 제공하면 or 임
      where: {
        // 아닌 경우 가져오기
        // additionalId: Not(1)
        // 적은 경우 가져오기
        // additionalId: LessThan(4)
        // 작거나 같은 경우 가져오기
        // additionalId: LessThanOrEqual(30)
        // additionalId: MoreThan(30)
        // additionalId: MoreThanOrEqual(30)
        // 같은 경우
        // additionalId: Equal(30)
        // 유사값 가져오기
        // email: Like('%google%')
        // 대소문자 구분안하는 유사값
        // email: ILike('%GOOGLE%')
        // 사이값
        // additionalId: Between(10, 15)
        // 해당되는 여러 가지 값
        // additionalId: In([1, 3, 5, 7, 99])
        // null 만 가져오기
        // additionalId: IsNull()
      },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // 정의하면 정의된 프로퍼티만 가져온다
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      // },
      // 관계를 가져오는 법
      // relations: {
      //   profile: true,
      // },
      // 오름차 내림차
      // ASC -> 오름차
      // DSC -> 내림차
      // order: {
      //   id: 'ASC',
      // },
      // 처음 몇개를 제외할 지
      // skip: 0,
      // 몇개를 가져올지
      // 0은 기본값, 전부가져옴
      // take: 0,
    });
  }

  async createUser() {
    // return this.userRepository.save({
    //   email: 'asdtast@gsdav.do',
    // });
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  async updateUser(additionalId: string) {
    return this.userRepository.update(
      { additionalId: Number(additionalId) },
      {
        // title: 'updated',
      },
    );
  }

  async getProfile() {
    return this.profileRepository.find();
  }

  async createProfile() {
    const user = await this.userRepository.save({
      email: 'test@test.com',
      profile: {
        profileImage: 'asdfas.jpg',
      },
    });

    // const profile = await this.profileRepository.save({
    //   user,
    //   profileImage: 'test.jpg',
    // });

    return user;
  }

  async deleteProfile(id: string) {
    await this.profileRepository.delete(+id);
  }

  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  async getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }
  async getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }

  async createSample() {
    // 모델에 해당되는 객체 생성 - db 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'asdfasdfasdfasdf@g.co'
    // })

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 값을 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함
    // 저장하지는 않음
    // find + create
    // const user2 = await this.userRepository.preload({
    //   additionalId: 99,
    //   email: 'asdfvet@sdf.ge',
    // });

    // 삭제하기
    // await this.userRepository.delete({
    //   additionalId: 99,
    // });

    // 값을 증가
    // await this.userRepository.increment(
    //   {
    //     additionalId: 1,
    //   },
    //   'count',
    //   2,
    // );

    // 값을 감소
    // await this.userRepository.decrement (
    //   {
    //     additionalId: 1,
    //   },
    //   'count',
    //   2,
    // );

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // 더하기
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });

    // 평균
    // const average = await this.userRepository.average('count', {
    //   additionalId: LessThan(4),
    // });

    // 최소값
    // const min = await this.userRepository.minimum('count', {
    //   additionalId: LessThan(4),
    // });

    // 최대값
    // const max = await this.userRepository.maximum('count', {
    //   additionalId: LessThan(4),
    // });

    // 페이지네이션 할 때 유용
    // 돌려주는 배열의 두번째 값이 전체 리스트의 갯수임
    const usersAndCount = await this.userRepository.findAndCount({
      take: 20,
    });

    return usersAndCount;
  }
}
