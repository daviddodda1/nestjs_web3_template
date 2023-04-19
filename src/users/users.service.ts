import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { UserRepository } from './entities/user.repository';
import { ErrorMessage } from 'src/utils/error-message';
import { LoginResponse } from './interfaces/login-responce-interface';
import { LoinUserDto } from './dto/login-user.dto';
import Web3 from 'web3';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async _Helper_loginSignatureValidator(
    signature,
    signature_message,
    public_address,
  ): Promise<boolean> {
    const web3 = new Web3();

    const address = web3.eth.accounts.recover(signature_message, signature);
    return address == public_address;
  }

  async loginUser(loginUserDto: LoinUserDto): Promise<LoginResponse> {
    const { public_address, signature, signature_message } = loginUserDto;

    try {
      if (!signature || !signature_message) {
        throw new BadRequestException(
          ErrorMessage({ message: 'Please Provide the Signature to Login.' }),
        );
      }

      // ! Comment out this code to disable account validation. (only for testing)
      const isSignatureVerified = await this._Helper_loginSignatureValidator(
        signature,
        signature_message,
        public_address,
      );

      if (!isSignatureVerified) {
        throw new BadRequestException({
          message: 'Invalid Signature',
        });
      }

      if (!(await this.userRepo.isUserInSystem(public_address))) {
        await this.userRepo.createUser(public_address);
      }

      return this.userRepo.loginUser(public_address);
    } catch (error) {
      throw new InternalServerErrorException(ErrorMessage(error));
    }
  }
}
