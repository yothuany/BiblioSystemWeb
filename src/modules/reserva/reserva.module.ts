import { Module } from "@nestjs/common";
import { ReservaController } from "./reserva.controller";
import { ReservaService } from "./reserva.service";

@Module({
    imports: [],
    controllers: [ReservaController],
    providers: [ReservaService],
    exports: []
})
export class ReservaModule {}