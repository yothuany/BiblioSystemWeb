import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { AutorService } from '../autor/autor.service';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class LivroCombosInterceptor implements NestInterceptor {
  constructor(
    private readonly autorService: AutorService,
    private readonly categoriaService: CategoriaService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    // Busca os dados do banco antes que a requisição termine ou falhe na validação
    request.combos = {
      autores: await this.autorService.findAll(),
      categorias: await this.categoriaService.findAll()
    };
    return next.handle();
  }
}