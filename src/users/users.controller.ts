import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoinUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  @ApiOkResponse({
    description: 'Authenticate User based on the public_address and signature',
  })
  LoginUser(@Body() loinUserDto: LoinUserDto) {
    return this.usersService.loginUser(loinUserDto);
  }

  @Get('/me')
  @ApiOkResponse({
    description: 'Get Authenticated user data.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findUser(@GetUser() user: User) {
    return user;
  }
}
