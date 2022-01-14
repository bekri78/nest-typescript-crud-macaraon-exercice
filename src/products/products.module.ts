import { CourseRepository } from 'src/repository/product.repository';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/* eslint-disable prettier/prettier */
import { ProductsController } from './products.contoller';
import { ProductsService } from './products.service';
import { ProductSchema } from './product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CourseRepository],
})
export class ProductsModule {}
