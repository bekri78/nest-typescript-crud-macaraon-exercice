/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
// ce sont des decorateurs
import { ProductsService } from './products.service';
// j'importe ProductsService et je peux utiliser toute les methodes presente
// dedans avec le this

// le controller se déclanche quand j'appelle /products

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // productsService: ProductsService pour que typescricpe sache l'utilisé
  // private car il ne sort pas de la classe
  // readonly : defini qu'on ne peut pas remplacer  productsService par une nouvelle valeur

  @Post()
  async addProduct(
    // aproche 1
    //   @Body() completeBody:{title:string,prodTitle: string,prodDesc: string,prodPrice: number}
    // on peut specifier dans body le champs de requète entrante
    // on peut egalement specifier le type
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    // pour recuperer la donnée
  ) {
    const generateId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generateId };
  }
  @Get() // recupere les donéee
  async getAllProducts() {
    const products = await this.productsService.getProduct(); // retourne une liste des produits
    return products;
  }

  // creater de la methode pour recuperer suivant le parametre (id) un element
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  // pour modifier un produit avec  patch

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
