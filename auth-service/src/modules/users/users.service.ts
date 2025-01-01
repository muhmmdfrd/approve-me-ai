import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepo: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    const salt = genSaltSync(10);
    dto.password = hashSync(dto.password, salt);
    return this.userRepo.save<CreateUserDto>(dto);
  }

  findAll() {
    return this.userRepo.find({
      relations: {
        role: true,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.userRepo.findBy({
      id: id,
    });
  }

  findByUsername(username: string) {
    return this.userRepo.findOneBy({
      username: username,
    });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepo.update({ id: id }, dto);
  }

  remove(id: number) {
    return this.userRepo.delete({ id: id });
  }
}
