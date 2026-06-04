import { Module } from "@nestjs/common";
import { MembroController } from "./membro.controller";
import { MembroService } from "./membro.service";

@Module({
    imports: [],
    controllers: [MembroController],
    providers: [MembroService],
    exports: []
})
export class MembroModule {}