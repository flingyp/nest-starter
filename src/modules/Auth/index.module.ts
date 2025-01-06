import { Module } from '@nestjs/common';
import { AuthController } from './index.controller';
import { AuthService } from './index.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
