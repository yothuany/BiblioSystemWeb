import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { AutorModule } from './modules/autor/autor.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { LivroModule } from './modules/livro/livro.module'; // <-- FALTAVA ESTA LINHA!
import { ExemplarModule } from './modules/exemplar/exemplar.module';
import { MembroModule } from './modules/membro/membro.module';
import { EmprestimoModule } from './modules/emprestimo/emprestimo.module';
import { ReservaModule } from './modules/reserva/reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AutorModule,
    CategoriaModule,
    LivroModule, 
    MembroModule,
    EmprestimoModule,
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}