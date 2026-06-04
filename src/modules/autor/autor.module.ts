import { Module } from "@nestjs/common";
import { AutorController } from "./autor.controller";
import { AutorService } from "./autor.service";

@Module({
    imports: [],
    controllers: [AutorController],
    providers: [AutorService],
    exports: []
})
export class AutorModule {}