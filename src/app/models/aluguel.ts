import { Usuario } from "./usuario";

export class Aluguel {

    aluId: number;
    aluEndereco: string;
    aluPropietario: Usuario;
    aluInquilino: Usuario;
    aluComprovante: string;
    aluDiaPago: number;
    aluEstado: number;
    aluValor: number;
    aluFotoEntrada: string;
    aluFotoSaida: string;
    aluContrato: string;
    aluExpiracao: Date;

    constructor(
        aluId?: number,
        aluEndereco?: string,
        aluPropietario?: Usuario,
        aluInquilino?: Usuario,
        aluComprovante?: string,
        aluDiaPago?: number,
        aluEstado?: number,
        aluValor?: number,
        aluFotoEntrada?: string,
        aluFotoSaida?: string,
        aluContrato?: string,
        aluExpiracao?: Date
    ) {
        this.aluId = aluId || 0;
        this.aluEndereco = aluEndereco || '';
        this.aluPropietario = aluPropietario || new Usuario();
        this.aluInquilino = aluInquilino || new Usuario();
        this.aluComprovante = aluComprovante || '';
        this.aluDiaPago = aluDiaPago || 0;
        this.aluEstado = aluEstado || 0;
        this.aluValor = aluValor || 0;
        this.aluFotoEntrada = aluFotoEntrada || '';
        this.aluFotoSaida = aluFotoSaida || '';
        this.aluContrato = aluContrato || '';
        this.aluExpiracao = aluExpiracao || new Date();
    }
}
