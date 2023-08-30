import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOperation } from '@nestjs/swagger'; // Import the necessary decorators
import { CreateUserDto, LoginUserDto } from 'src/auth/types';
import { HttpResponse } from 'src/util';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);

    return HttpResponse.created(
      response,
      createdUser,
      'user created successfully',
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login for users' }) // Add this decorator
  @ApiCreatedResponse({
    description: 'The user has been successfully logged in.',
  })
  async loginUser(@Res() response, @Body() loginUserDto: LoginUserDto) {
    const loggedInUser = await this.userService.loginUser(loginUserDto);
    return HttpResponse.ok(response, loggedInUser, 'login successful');
  }
}
