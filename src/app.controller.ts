import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  async getUsers() {
    return this.appService.getAllUsers();
  }

  @Post('users')
  async postUser() {
    return this.appService.createUser();
  }

  @Patch('users/:additionalId')
  async patchUser(@Param('additionalId') additionalId: string) {
    return this.appService.updateUser(additionalId);
  }

  @Get('profile')
  async getProfile() {
    return this.appService.getProfile();
  }

  @Post('user/profile')
  async postProfile() {
    return this.appService.createProfile();
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    return this.appService.deleteProfile(id);
  }

  @Post('user/post')
  async postPost() {
    return this.appService.createUserAndPost();
  }

  @Post('posts/tags')
  async postTags() {
    return this.appService.createPostsTags();
  }

  @Get('posts')
  async getPosts() {
    return this.appService.getPosts();
  }

  @Get('tags')
  async getTags() {
    return this.appService.getTags();
  }

  @Post('sample')
  async postSample() {
    return this.appService.createSample();
  }
}
