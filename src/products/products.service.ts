import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  async create(createProductDto: CreateProductDto,
    user:User) {
    try{
       const product = this.productRepository.create({
        ...createProductDto
      ,user});
       await this.productRepository.save(product);
       return product;
    }
    catch(error){
      console.log(error);
    }
    
  }

  async findAll() {
    const products = await this.productRepository.find({});
    return products;
  }
    

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id:id});
    console.log(product);
    if(!product) throw new NotFoundException('Product not found');
    return product;
  }
    

 async update(id: string, updateProductDto: UpdateProductDto) {
  const product=await this.productRepository.preload({id:id,
  ...updateProductDto});
  if(!product) throw new NotFoundException('Product not found');
  await this.productRepository.save(product);
    return product;
  }
  async remove(id: string) {
    const product = await this.productRepository.findOneBy({id:id});
    if(!product) throw new NotFoundException('Product not found');
    await this.productRepository.remove(product);
    console.log(product);
    console.log('Product deleted');
    return product;
  }
   
}
