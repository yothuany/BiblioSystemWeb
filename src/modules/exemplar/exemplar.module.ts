import { Module } from "@nestjs/common";
import { ExemplarController } from "./exemplar.controller";
import { ExemplarService } from "./exemplar.service";

@Module({
    imports: [],
    controllers: [ExemplarController],
    providers: [ExemplarService],
    exports: []
})
export class ExemplarModule {}