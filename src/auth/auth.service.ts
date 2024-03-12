import { BadRequestException, Injectable,UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtPayload } from './interfaces/Jwt.payload';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
import { LoginAuthDto } from './dto/login-auth.dto';	
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    
    private readonly jwtService:JwtService
  ){}
  async create(createAuthDto: CreateAuthDto) {
    try{
      const user=this.userRepository.create({
        ...createAuthDto,
        password:bcrypt.hashSync(createAuthDto.password,10)
      });
      await this.userRepository.save(user);
      const {email,fullName}=user;
      return {email,fullName};
      
    }
    catch(e){
      console.log(e);
      throw new BadRequestException(e.detail);
    }
    
  }
  private getJwtToken(payload:JwtPayload){
    
    const  token=this.jwtService.sign(payload);
    return token;
  }
  async login(loginUser:LoginAuthDto){
    try{
      const {email,password}=loginUser;
      const user=await this.userRepository.findOneBy({email});
      if(!user) throw new UnauthorizedException('User or password incorrect');
      const isValid=bcrypt.compareSync(password, user.password);

      if(!isValid) throw new UnauthorizedException('User or password incorrect');
      const jwt=this.getJwtToken({email});
      return {email,jwt};
    }
    catch(e){
      throw new UnauthorizedException('User or password incorrect');
    }
  }
}
