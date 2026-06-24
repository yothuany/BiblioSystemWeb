import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('inicial')
  getInicial(): object {
    return {
      titulo: 'BiblioSystem - Gestão de Biblioteca',
      horaAgora: new Date().toLocaleString('pt-BR'),
    };
  }

  @Get('sobre')
  @Render('_sobre')
  getSobre(): object {
    return {
      titulo: 'Seção de informações do sistema.',
    };
  }

  @Get('login')
  @Render('autenticacao/login')
  login(): object {
    return { layout: false };
  }
}