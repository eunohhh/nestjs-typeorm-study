import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileModel } from './entities/profile.entity';
import { UserModel } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  async getAllUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  async createUser() {
    return this.userRepository.save({});
  }

  async updateUser(additionalId: string) {
    return this.userRepository.update(
      { additionalId: Number(additionalId) },
      {
        // title: 'updated',
      },
    );
  }

  async createProfile() {
    const user = await this.userRepository.save({
      email: 'test@test.com',
    });

    const profile = await this.profileRepository.save({
      user,
      profileImage: 'test.jpg',
    });

    return user;
  }
}
