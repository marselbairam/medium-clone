import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { AuthUserDto } from '@app/user/dto/auth-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = this.userRepository.findOne({
      email: createUserDto?.email,
    });
    const userByUsername = this.userRepository.findOne({
      username: createUserDto?.username,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  async authUser(authUserDto: AuthUserDto): Promise<any> {
    const user = await this.userRepository.findOne(
      {
        email: authUserDto?.email,
      },
      { select: ['id', 'username', 'email', 'bio', 'image', 'password'] },
    );

    if (!user) {
      throw new HttpException(
        "User with this email doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      authUserDto?.password,
      user?.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'User password is incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }
}
