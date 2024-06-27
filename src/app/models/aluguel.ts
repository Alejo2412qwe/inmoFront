export class Aluguel {

    aluId: number;
    aluEndereco: string;
    aluPropietario: number;
    aluInquilino: number;
    aluFotoEntrada: string;
    aluFotoSaida: string;
    aluContrato: string;
    aluExpiracao: Date;

    constructor(
        aluId?: number,
        aluEndereco?: string,
        aluPropietario?: number,
        aluInquilino?: number,
        aluFotoEntrada?: string,
        aluFotoSaida?: string,
        aluContrato?: string,
        aluExpiracao?: Date
    ) {
        this.aluId = aluId || 0;
        this.aluEndereco = aluEndereco || '';
        this.aluPropietario = aluPropietario || 0;
        this.aluInquilino = aluInquilino || 0;
        this.aluFotoEntrada = aluFotoEntrada || '';
        this.aluFotoSaida = aluFotoSaida || '';
        this.aluContrato = aluContrato || '';
        this.aluExpiracao = aluExpiracao || new Date();
    }
}
