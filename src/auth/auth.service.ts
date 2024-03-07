import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
