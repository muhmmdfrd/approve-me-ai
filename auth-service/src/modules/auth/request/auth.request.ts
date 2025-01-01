import { ApiProperty } from '@nestjs/swagger';

export class AuthRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
