import { Controller, Get, Post, Body,  UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { getUser } from './decorators/getuser.decorator';
import { User } from './entities/auth.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @Get('private')
  @UseGuards(AuthGuard())
  mundo(@getUser() user:User){
    const {email,fullName,isActive}=user;
    return {email,fullName,isActive};
  }
}
