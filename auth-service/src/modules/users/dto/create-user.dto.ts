import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;

  createdBy: number;
  createdAt: Date;
  modifiedBy: number;
  modifiedAt: Date;
}
