import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return {
      access_token: 'token',
    };
  }
}
