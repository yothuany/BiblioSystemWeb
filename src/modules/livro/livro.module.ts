import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
import { AutorModule } from '../autor/autor.module';
import { CategoriaModule } from '../categoria/categoria.module';
import { LivroCombosInterceptor } from './livro-combos.interceptor';

@Module({
  imports: [AutorModule, CategoriaModule], // Permite ao interceptor buscar autores e categorias
  controllers: [LivroController],
  providers: [LivroService, LivroCombosInterceptor],
  exports: [LivroService] // <--- ADICIONE ESTA LINHA SE NÃO HOUVER
})
export class LivroModule {}