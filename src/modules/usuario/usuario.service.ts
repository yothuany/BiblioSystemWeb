import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";

@Injectable()
export class UsuarioService {     
    async findAll(): Promise<Usuario[]> {
        return Usuario.find();
    }
}