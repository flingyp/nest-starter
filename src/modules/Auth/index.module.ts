import { Module } from '@nestjs/common';
import { AuthController } from './index.controller';
import { AuthService } from './index.service';
import { AppModule } from 'src/app.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
