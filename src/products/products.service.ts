import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  async create(createProductDto: CreateProductDto) {
    try{
       const product = this.productRepository.create(createProductDto);
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
    

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
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
