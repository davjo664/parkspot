import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe
} from '@nestjs/common';
import {UserService} from './user.service';
import {UserCreateDto, UserUpdateDto} from './user.dto';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {UserEntity} from './user.entity';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/:id')
  @ApiResponse({status: HttpStatus.OK, description: 'Returns a single User', type: UserEntity})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'When user doesn\'t exist'})
  async get(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.userService.findOne(+id);
    } catch (e) {
      console.error(e);
      throw new HttpException(`Couldn't find user with id ${id}`, HttpStatus.NOT_FOUND);
    }
  }


  @Put('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updates a single User and returns the updated user as it is in the database',
    type: UserEntity
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User was not found, therefore not modified',
  })
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateData: UserUpdateDto): Promise<UserEntity> {
    try {
      return await this.userService.update(+id, updateData);
    } catch (e) {
      console.error(e);
      throw new HttpException(`Couldn't find user with id ${id}`, HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The User has been successfully created.',
    type: UserEntity,
  })
  @ApiResponse({status: HttpStatus.CONFLICT, description: `Couldn't create user`})
  @Post()
  async create(@Body(new ValidationPipe()) userDto: UserCreateDto): Promise<UserEntity> {
    try {
      return await this.userService.create(userDto);
    } catch (e) {
      console.error(e);
      throw new HttpException(`Couldn't create user`, HttpStatus.CONFLICT);
    }
  }
}
