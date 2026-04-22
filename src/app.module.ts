import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthModule, CommonModule, DemoModule } from './modules'
import { PrismaModule } from './prisma/prisma.module'
import { DemoTask } from './schedules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ScheduleModule.forRoot(),
    DemoModule,
    CommonModule,
    AuthModule,
  ],
  providers: [DemoTask],
})
export class AppModule {}
