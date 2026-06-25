import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';
import { Emprestimo } from './emprestimo.entity';

@Module({
  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  exports: [EmprestimoService],
})
export class EmprestimoModule {}