import { Controller, Get, Req, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    // Guards handle the redirect to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const { access_token, user } = await this.authService.validateGoogleUser(req.user);
      
      const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
      
      // Determine where to send the user based on onboarding status
      const targetPage = user.isOnboardingCompleted ? '/' : '/onboarding';
      const redirectUrl = `${frontendUrl}${targetPage}?token=${access_token}`;

      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('OAuth Redirect Error:', error);
      const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/login?error=oauth_failed`);
    }
  }
}
