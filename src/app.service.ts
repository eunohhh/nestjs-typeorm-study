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
    return this.userRepository.find({});
  }

  async createUser() {
    return this.userRepository.save({
      email: 'asdtast@gsdav.do',
    });
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
}
