import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');
    
    console.log('Google OAuth Config:', {
      clientID: clientID ? '***' + clientID.slice(-5) : 'MISSING',
      clientSecret: clientSecret ? '***' + clientSecret.slice(-5) : 'MISSING',
      callbackURL,
    });

    super({
      clientID: clientID || '',
      clientSecret: clientSecret || '',
      callbackURL: callbackURL || '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos, id } = profile;
      
      if (!emails || emails.length === 0) {
        return done(new Error('No email found in Google profile'), undefined);
      }

      const user = {
        email: emails[0].value,
        firstName: name?.givenName || '',
        lastName: name?.familyName || '',
        picture: photos?.[0]?.value || '',
        googleId: id,
        accessToken,
      };

      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }
}
