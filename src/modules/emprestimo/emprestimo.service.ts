import { Injectable, NotFoundException } from '@nestjs/common';
import { Emprestimo } from './emprestimo.entity';
import { CreateEmprestimoDto } from './dtos/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dtos/update-emprestimo.dto';
import { Membro } from '../membro/membro.entity';
import { Exemplar } from '../exemplar/exemplar.entity';
import { Not } from 'typeorm';

@Injectable()
export class EmprestimoService {
  
  async findAll(): Promise<Emprestimo[]> {
    return await Emprestimo.find({
      relations: { membro: true, exemplar: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Emprestimo> {
    const emprestimo = await Emprestimo.findOne({
      where: { id },
      relations: { membro: true, exemplar: true },
    });
    if (!emprestimo) throw new NotFoundException(`Empréstimo #${id} não encontrado.`);
    return emprestimo;
  }

  async create(dto: CreateEmprestimoDto): Promise<Emprestimo> {
    const membro = await Membro.findOne({ where: { cpf: dto.membroCpf } });
    if (!membro) throw new Error('Nenhum membro foi encontrado com o CPF informado.');

    const exemplar = await Exemplar.findOne({ where: { codigo: dto.exemplarCodigo } });
    if (!exemplar) throw new Error('O código do exemplar informado não existe no sistema.');

    // TRAVA: Impede que o mesmo exemplar saia se já estiver ocupado
    const exemplarOcupado = await Emprestimo.findOne({
      where: [
        { exemplarId: exemplar.id, status: 'Ativo' },
        { exemplarId: exemplar.id, status: 'Atrasado' }
      ]
    });
    if (exemplarOcupado) {
      throw new Error('Este exemplar já está emprestado e não está disponível no momento.');
    }

    // 🔴 SINCRONIZAÇÃO: Atualiza o status do Exemplar para Emprestado
    exemplar.status = 'Emprestado';
    await exemplar.save();

    const novoEmprestimo = Emprestimo.create({
      data_emprestimo: dto.data_emprestimo,
      data_prevista_devolucao: dto.data_prevista_devolucao,
      status: 'Ativo',
      valor_multa: 0.00,
      membroId: membro.id,
      exemplarId: exemplar.id,
    });

    return await Emprestimo.save(novoEmprestimo);
  }

  async update(id: number, dto: UpdateEmprestimoDto): Promise<Emprestimo> {
    const emprestimo = await this.findOne(id);
    
    if (dto.membroCpf) {
      const membro = await Membro.findOne({ where: { cpf: dto.membroCpf } });
      if (!membro) throw new Error('CPF do membro inválido ou não encontrado.');
      emprestimo.membroId = membro.id;
    }

    if (dto.exemplarCodigo) {
      const exemplar = await Exemplar.findOne({ where: { codigo: dto.exemplarCodigo } });
      if (!exemplar) throw new Error('Código do exemplar inválido ou não encontrado.');
      
      const ocupadoNovoExemplar = await Emprestimo.findOne({
        where: [
          { id: Not(id), exemplarId: exemplar.id, status: 'Ativo' },
          { id: Not(id), exemplarId: exemplar.id, status: 'Atrasado' }
        ]
      });
      if (ocupadoNovoExemplar) throw new Error('O exemplar informado já está alugado em outro empréstimo ativo.');
      
      emprestimo.exemplarId = exemplar.id;
    }

    emprestimo.data_emprestimo = dto.data_emprestimo || emprestimo.data_emprestimo;
    emprestimo.data_prevista_devolucao = dto.data_prevista_devolucao || emprestimo.data_prevista_devolucao;
    
    if (dto.status) {
      emprestimo.status = dto.status;
      
      if (dto.status === 'Devolvido') {
        const hojeLocal = new Date();
        
        const ano = hojeLocal.getFullYear();
        const mes = String(hojeLocal.getMonth() + 1).padStart(2, '0');
        const dia = String(hojeLocal.getDate()).padStart(2, '0');
        const dataHojeLocalStr = `${ano}-${mes}-${dia}`;
        
        emprestimo.data_devolucao = dataHojeLocalStr;

        // 🔴 SINCRONIZAÇÃO: Devolve o exemplar mudando para Disponível
        const exemplarDoEmprestimo = await Exemplar.findOne({ where: { id: emprestimo.exemplarId } });
        if (exemplarDoEmprestimo) {
            exemplarDoEmprestimo.status = 'Disponível';
            await exemplarDoEmprestimo.save();
        }

        const dataHojePura = new Date(ano, hojeLocal.getMonth(), hojeLocal.getDate());
        const [pAno, pMes, pDia] = emprestimo.data_prevista_devolucao.split('-').map(Number);
        const dataPrevistaPura = new Date(pAno, pMes - 1, pDia);

        if (dataHojePura.getTime() > dataPrevistaPura.getTime()) {
          const diferencaMili = dataHojePura.getTime() - dataPrevistaPura.getTime();
          const diasAtraso = Math.floor(diferencaMili / (1000 * 60 * 60 * 24));
          
          const VALOR_DIARIO_MULTA = 2.00;
          emprestimo.valor_multa = diasAtraso * VALOR_DIARIO_MULTA;
        } else {
          emprestimo.valor_multa = 0.00;
        }
      }
    }

    return await Emprestimo.save(emprestimo);
  }

  async remove(id: number): Promise<void> {
    const emprestimo = await this.findOne(id);
    
    // 🔴 PROTEÇÃO: Se apagarem o empréstimo sem devolver, liberta o exemplar na mesma
    if (emprestimo.status !== 'Devolvido') {
        const exemplar = await Exemplar.findOne({ where: { id: emprestimo.exemplarId } });
        if (exemplar) {
            exemplar.status = 'Disponível';
            await exemplar.save();
        }
    }
    
    await Emprestimo.remove(emprestimo);
  }
}