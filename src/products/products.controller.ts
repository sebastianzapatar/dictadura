import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from 'src/auth/guards/use-role-guard.guard';
import { getUser } from 'src/auth/decorators/getuser.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    ) {}

  @Post()
  @UseGuards(AuthGuard(),UseRoleGuardGuard)
  create(@getUser() user:User,
  @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto,user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    
      return this.productsService.findOne(id);
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(),UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  
}
