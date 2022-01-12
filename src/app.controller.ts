import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
// par default le controleur est sur mon-domaine.com/
// pour faire un chemin exmple mon-domaine.com/users
//@Controller('users)

// si je veux faire mon-domaine.com/products/user
//@Controller('products)
//@Get('users)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html') // pour configurer l'en tete
  getHello(): string {
    return this.appService.getHello();
  }

  // getHello(): {name: string }{
  //   return {name:"Max"}
  // }
}
