import { Module } from "@nestjs/common";
import { LivroController } from "./livro.controller";
import { LivroService } from "./livro.service";

@Module({
    imports: [],
    controllers: [LivroController],
    providers: [LivroService],
    exports: []
})
export class LivroModule {}