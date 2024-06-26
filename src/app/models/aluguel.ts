import { Usuario } from "./usuario";

export class Aluguel {

    aluId: number;
    aluEndereco: string;
    aluPropietario: Usuario;
    aluInquilino: Usuario;
    aluFotoEntrada: string;
    aluFotoSaida: string;
    aluContrato: string;
    aluExpiracao: Date;

    constructor(
        aluId?: number,
        aluEndereco?: string,
        aluPropietario?: Usuario,
        aluInquilino?: Usuario,
        aluFotoEntrada?: string,
        aluFotoSaida?: string,
        aluContrato?: string,
        aluExpiracao?: Date
    ) {
        this.aluId = aluId || 0;
        this.aluEndereco = aluEndereco || '';
        this.aluPropietario = aluPropietario || new Usuario();
        this.aluInquilino = aluInquilino || new Usuario();
        this.aluFotoEntrada = aluFotoEntrada || '';
        this.aluFotoSaida = aluFotoSaida || '';
        this.aluContrato = aluContrato || '';
        this.aluExpiracao = aluExpiracao || new Date();
    }
}
