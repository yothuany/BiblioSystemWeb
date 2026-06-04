import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('incial') // <-- Removi o "i" para bater com o nome do seu arquivo "incial.ejs"
  getHello(): object {
    // Retornamos um objeto vazio para o Express renderizar a página sem quebrar
    return {};
  }

  @Get('sobre')
  @Render('_sobre')
  getSobre(): object {
    return {
      titulo: 'Seção de informações do sistema web.',
    };
  }

  @Get('login')
  @Render('autenticacao/login')
  login(): object {
    return { layout: false };
  }
}