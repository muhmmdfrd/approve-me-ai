import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthRequest } from './request/auth.request';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: AuthRequest) {
    const user = await this.authService.validateUser(
      request.username,
      request.password,
    );

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const response = await this.authService.login(user);

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtected(@Request() req: any) {
    return { message: 'This is a protected route', user: req.user };
  }
}
