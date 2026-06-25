import { Module } from '@nestjs/common';
import { ExemplarController } from './exemplar.controller';
import { ExemplarService } from './exemplar.service';
import { LivroModule } from '../livro/livro.module'; // Necessário para injetar o LivroService no Interceptor

@Module({
  imports: [LivroModule],
  controllers: [ExemplarController],
  providers: [ExemplarService],
  exports: [ExemplarService],
})
export class ExemplarModule {}