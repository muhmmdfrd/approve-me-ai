import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
