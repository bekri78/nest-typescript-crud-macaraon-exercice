/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';
import { CourseRepository } from 'src/repository/product.repository';
@Injectable()
export class ProductsService {
  private products: Product[] = [];
  // creation d'un tableau qui n'axcepte que Product
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly courseRepository: CourseRepository,
  ) {}
  // creation d'une function qui push dans le tableau
  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProduct() {
    const products = await this.courseRepository.findAll(); // permet de trouver la donnée methode mongoose exec permet de

    console.log(products);

    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.courseRepository.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updateProduct = await this.courseRepository.findProduct(productId);

    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.courseRepository.saveDb(updateProduct);
  }

  async deleteProduct(id: string) {
    const result = await this.courseRepository.deleteOne(id);
    if (result === null) {
      throw new NotFoundException('Aucun produit trouver');
    }
  }
}
