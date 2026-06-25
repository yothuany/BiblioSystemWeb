import { Module } from '@nestjs/common';
import { MembroController } from './membro.controller';
import { MembroService } from './membro.service';

@Module({
  controllers: [MembroController],
  providers: [MembroService],
  exports: [MembroService], 
})
export class MembroModule {}