import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: any) {
    // 1. Check if user exists
    let user = await this.usersService.findOneByGoogleId(googleUser.googleId);

    if (!user) {
      // 2. Create user if they don't exist
      user = await this.usersService.create({
        email: googleUser.email,
        name: `${googleUser.firstName} ${googleUser.lastName}`.trim(),
        googleId: googleUser.googleId,
        profilePhoto: googleUser.picture,
        isOnboardingCompleted: false,
      });
    }

    // 3. Generate JWT
    const payload = { 
      email: user.email, 
      sub: user.id,
      name: user.name 
    };
    
    const access_token = this.jwtService.sign(payload);

    return { 
      access_token, 
      user 
    };
  }
}
