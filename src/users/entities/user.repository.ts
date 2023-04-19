import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

import { JwtPayload } from 'jsonwebtoken';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginResponse } from '../interfaces/login-responce-interface';
import { ErrorMessage } from 'src/utils/error-message';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findUserFromPublicAddressList(public_address_arr: string[]) {
    return this.userModel.find({ public_address: { $in: public_address_arr } });
  }

  async isUserInSystem(public_address: string): Promise<boolean> {
    const user = await this.userModel.findOne({ public_address });
    if (user) {
      return true;
    }
    return false;
  }

  async createUser(public_address): Promise<void> {
    const userData = {
      _id: uuid(),
      public_address,
    };
    await this.userModel.create(userData);
  }

  async loginUser(public_address): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ public_address });

    //* Redundant code. (better safe then sorry)
    if (!user) {
      throw new NotFoundException(
        ErrorMessage({
          message: 'There is no user with this public address in the system',
        }),
      );
    }

    const jwt_payload: JwtPayload = {
      id: user._id,
      public_address: user.public_address,
    };

    const accessToken = this.jwtService.sign(jwt_payload);

    return {
      accessToken,
      userData: user,
    };
  }

  async getUsers(page_limit, page_number): Promise<User[]> {
    const users = await this.userModel
      .find({})
      .skip((page_number - 1) * page_limit)
      .limit(page_limit);

    return users;
  }
}
