import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Post('users/profile')
  async postProfile() {
    return this.appService.createProfile();
  }
}
