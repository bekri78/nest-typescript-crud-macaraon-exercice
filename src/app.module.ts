import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseRepository } from './repository/product.repository';

import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://macaron:2022@cluster0.p8qt6.mongodb.net/Cluster0?retryWrites=true&w=majority',
    ),
  ],
  // initialisation des que possible a la bdd mongoose
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
