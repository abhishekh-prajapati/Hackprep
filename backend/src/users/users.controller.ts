import { Controller, Get, Post, Body, UseGuards, Req, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Req() req) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('me/onboarding')
  async completeOnboarding(@Req() req, @Body() updateData: any) {
    return this.usersService.update(req.user.id, {
      ...updateData,
      isOnboardingCompleted: true,
    });
  }
}
