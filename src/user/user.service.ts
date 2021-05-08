import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { getRepository, InsertResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
  register(newUser: UserEntity): UserEntity | PromiseLike<UserEntity> {
    return this.repo.save(newUser);
  }
  async getUserById(id: string) {
    return getRepository(UserEntity)
      .createQueryBuilder('user')
      .where("user.userId = :id", { id: id })
      .getOne()
  }
}
