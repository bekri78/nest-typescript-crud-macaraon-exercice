/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = [];
  // creation d'un tableau qui n'axcepte que Product
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  // creation d'une function qui push dans le tableau
  async insertProduct(title: string, desc: string, price: number) {
    //  plus besoon car mongoose va le generer const prodId = new Date().toString();
    // const prodId = Math.random().toString(); // nombre aleatoir en string
    //AVANT TRANSFORMATION POUR MONGGOSE const newProduct = new Product(prodId, title, desc, price);
    // AVANT const newProduct = new this.productModel(prodId, title, desc, price);
    const newProduct = new this.productModel({
      //title: title, quand les deux valeurs sont égales pas besoin de l'ecrire 2 fois
      title,
      description: desc,
      price,
    });
    // this.products.push(newProduct);
    // au mieu de push dans un tablrau utilisation de save  methode mongoose
    const result = await newProduct.save();
    // a la place d'utiliser then pour que ce soit asynchrone on va utiliser async await
    //newProduct.save().then()
    console.log(result);
    return result.id as string;
  }

  // pour avoir tous les produits
  async getProduct() {
    // asynchrone
    const products = await this.productModel.find().exec(); // permet de trouver la donnée methode mongoose exec permet de
    /*est utilisée pour exécuter la requête.
     Il peut gérer les promesses et exécute la requête facilement. 
    Le rappel peut être passé en tant que paramètre facultatif pour gérer 
    les erreurs et les résultats. */
    console.log(products);
    // return products as Product[];
    // je map la bdd pour retourner un meilleur format pour eviter le _1 sur id
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));

    // plus besoin de creer un copie du tableau car on recois les donnée de mongoose
    // return [...this.products]; // je creer une copie du tableau
  }

  // pour avoir un produits
  async getSingleProduct(productId: string) {
    // appel de la methode findProduct
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }
  // pour modifier un produit

  // o, va fetch les donner de la bdd les modifier et les renvoyer a mongoodb
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updateProduct = await this.findProduct(productId);
    //const index = this.findProduct(productId)[0];
    // pour eviter repetition
    //const [product, index] = this.findProduct(productId);
    //const updateProduct = { ...product };
    // verification du produit pour eviter les erreur et changer un element qui n'existe pas
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }

    updateProduct.save();
    // this.products[index] = updateProduct;
  }

  // pour supprimer un produit
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result === null) {
      throw new NotFoundException('Aucun produit trouver');
    }
  }

  // ici je creer une methode avec  private afin de pouvoir la reutiliser plusieur fois cela evite les doublons
  //[Product, number]
  private async findProduct(id: string): Promise<Product> {
    let product;
    // try catch pour eviter de faire planter le serveur si mauvaise requète
    try {
      product = await this.productModel.findById(id).exec(); // methide mongoose
    } catch (error) {
      throw new NotFoundException('Aucun produit trouver');
    }
    // const productIndex = this.products.findIndex((prod) => prod.id === id);
    // const product = this.products[productIndex];
    if (!product) {
      // ici grace a NotFoundException de nestjs je peux redigrer un message si le pro
      // le produit n'existe pas
      throw new NotFoundException('Aucun produit trouver');
    }
    // return [product, productIndex];
    return product;
    // return {
    //   id: product.id,
    //   title: product.title,
    //   description: product.description,
    //   price: product.price,
    // };
  }
}
