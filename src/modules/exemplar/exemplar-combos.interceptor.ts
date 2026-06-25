import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LivroService } from '../livro/livro.service';

@Injectable()
export class ExemplarCombosInterceptor implements NestInterceptor {
  constructor(private readonly livroService: LivroService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    request.combos = {
      livros: await this.livroService.findAll()
    };
    return next.handle();
  }
}