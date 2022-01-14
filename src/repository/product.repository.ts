/* eslint-disable prettier/prettier */
import { Product } from './../products/product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectModel('Product')
    public readonly productModel: Model<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec(); // methide mongoose
    } catch (error) {
      throw new NotFoundException('Aucun produit trouver');
    }

    if (!product) {
      throw new NotFoundException('Aucun produit trouver');
    }

    return product;
  }

  async deleteOne(id: string) {
    this.productModel.deleteOne({ _id: id }).exec();
  }

  async saveDb(product: Product) {
    return product.save();
  }
}
