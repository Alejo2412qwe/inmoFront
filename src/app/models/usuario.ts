import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {
  usuId: number;
  usuNombreUsuario: string;
  usuContrasena: string;
  usuCorreo: string;
  usuEstado: number;
  usuFechaRegistro: Date;
  usuPerId: Persona;
  rolId: Rol;
  foto: string; // Campo para la imagen

  constructor(
    usuId?: number,
    usuNombreUsuario?: string,
    usuContrasena?: string,
    usuEstado?: number,
    usuFechaRegistro?: Date,
    usuPerId?: Persona,
    rolId?: Rol,
    usuCorreo?: string,
    foto?: string, // Agregar el campo foto al constructor
  ) {
    this.usuId = usuId || 0;
    this.usuNombreUsuario = usuNombreUsuario || '';
    this.usuContrasena = usuContrasena || '';
    this.usuEstado = usuEstado || 0;
    this.usuFechaRegistro = usuFechaRegistro || new Date();
    this.usuPerId = usuPerId || new Persona();
    this.rolId = rolId || new Rol();
    this.usuCorreo = usuCorreo || '';
    this.foto = foto || ''; // Asignar el valor pasado o null si no se proporciona

  }
}

