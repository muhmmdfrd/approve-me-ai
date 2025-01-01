import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Use environment variables for better security
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy, ...usersProviders],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
