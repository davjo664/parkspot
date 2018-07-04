import {Component} from '@nestjs/common';
import {UserRepo} from './user-repository.provider';
import {UserEntity} from './user.entity';
import {UserCreateDto, UserUpdateDto} from './user.dto';

@Component()
export class UserService {


  constructor(private userRepo: UserRepo) {
  }

  async get(): Promise<UserEntity[]>{
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne({id});
    if (!user) {
      throw new Error(`Couldn't find user with id ${id}`);
    }
    return user;
  }

  async update(id: number, updateData: UserUpdateDto): Promise<UserEntity> {
    await this.findOne(id);
    return this.userRepo.save<UserEntity>({id, ...updateData} as UserEntity);
  }


  async create(userDto: UserCreateDto): Promise<UserEntity> {
    return this.userRepo.save(userDto as UserEntity);
  }
}
