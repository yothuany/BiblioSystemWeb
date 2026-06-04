import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';

import { CategoriaModule } from './modules/categoria/categoria.module';
import { LivroModule } from './modules/livro/livro.module';
import { AutorModule } from './modules/autor/autor.module';
import { ExemplarModule } from './modules/exemplar/exemplar.module';
import { MembroModule } from './modules/membro/membro.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EmprestimoModule } from './modules/emprestimo/emprestimo.module';
import { ReservaModule } from './modules/reserva/reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    
    CategoriaModule,
    LivroModule,
    AutorModule,
    ExemplarModule,
    MembroModule,
    UsuarioModule,
    EmprestimoModule,
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}