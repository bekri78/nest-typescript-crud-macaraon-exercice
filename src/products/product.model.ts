/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  // ici je defini le type String avec un S majuscule
  //car c'est du js et non du typescript que j'utilise dans mongoose
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

// transformation de class en interface pour le product service voir products.service.ts
// extends mongoose.Document permet d'avoir notre interface basé sur mongoose
export interface Product extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}

//AVANT
/*
id: string
title: string
description: string
price: number

constructor(id:string, title:string,desc:string,price:number){
    this.id=id
    this.title=title
    this.description= desc
    this.price= price
}
 */

// APRES
// constructor(
//   public id: string,
//   public title: string,
//   public description: string,
//   public price: number,
// ) {}

// public ou private permet de defnir si c'est disponilbe
// a l'interieur de cette classe ou a l'exterieur
