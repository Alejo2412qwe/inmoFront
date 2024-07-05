import { Aluguel } from './aluguel';

export class Comprovante {
    comId: number;
    comComprovante: string;
    comFechaRegistro: Date;
    aluId: Aluguel;

    constructor(
        comId?: number,
        comComprovante?: string,
        comFechaRegistro?: Date,
        aluId?: Aluguel
    ) {
        this.comId = comId || 0;
        this.comComprovante = comComprovante || '';
        this.comFechaRegistro = comFechaRegistro || new Date();
        this.aluId = aluId || new Aluguel();
    }
}
