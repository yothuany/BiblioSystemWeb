import { Controller, Get, Render } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";

@Controller('usuarios')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Get()
    @Render('usuario/inicial')
    async inicial(): Promise<object> {
        const usuarios = await this.usuarioService.findAll();

        return {
            titulo: 'Consulta de Usuários',
            usuarios
        }
    }
}