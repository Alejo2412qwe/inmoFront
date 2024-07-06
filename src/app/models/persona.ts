
export class Persona {
  perId: number;
  perCedula: string;
  perNombre: string;
  perApellido: string;
  perDireccion: string;
  perTelefono: string;
  perRG: string;
  perEstadoCivil: string;
  perNacionalidade: string;
  perFechaNacimiento: Date;

  constructor(
    perId?: number,
    perCedula?: string,
    perNombre?: string,
    perApellido?: string,
    perDireccion?: string,
    perTelefono?: string,
    perRG?: string,
    perEstadoCivil?: string,
    perNacionalidade?: string,
    perFechaNacimiento?: Date,
  ) {
    this.perId = perId || 0;
    this.perCedula = perCedula || '';
    this.perNombre = perNombre || '';
    this.perApellido = perApellido || '';
    this.perDireccion = perDireccion || '';
    this.perRG = perRG || '';
    this.perNacionalidade = perNacionalidade || '';
    this.perEstadoCivil = perEstadoCivil || '';
    this.perTelefono = perTelefono || '';
    this.perFechaNacimiento = perFechaNacimiento || new Date();
  }
}
