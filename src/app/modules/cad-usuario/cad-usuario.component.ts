import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { calcularEdad, validarCorreo, validarCPF } from 'src/app/common/validaciones';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
})
export class CadUsuarioComponent implements OnInit {

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private rolService: RolService,
    private toastr: ToastrService,
    private personaServie: PersonaService,
    private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.loadFunção();
  }

  Usuario: Usuario = new Usuario();
  Persona: Persona = new Persona()
  uploadedFiles: File[] = [];

  listaRoles: Rol[] = []

  confirmarPass: string = '';
  timeToastr: number = 4000;
  edadMinima = 18;
  newSubproceso: string = '';
  newInstitucion: string = '';
  newProceso: string = '';
  id: number = 0;
  editeMode: boolean = false;
  mostrarJefe: boolean = false;
  mode: string = ''
  userId: number = 0

  selectedFile: File | undefined = undefined;
  base64Image: any;
  base64String: string = '';

  rol: string = this.sessionStorage.getItem('rol') || '';

  loadFunção() {
    this.rolService.getAllRoles().subscribe((response) => {
      this.listaRoles = response;
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.convertToBase64();
    }
  }

  convertToBase64() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.base64String = reader.result as string;
      this.base64Image = this.base64String;
    };
  }

  removeFile() {
    this.Usuario.foto = '';
    const fileInput = document.getElementById('upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  validarRegistro(): boolean {
    //CEDULA
    if (!this.Persona.perCedula) {
      this.toastr.error(
        'Cedula es un campo obligatorio',
        'Ingrese un numero de identificación',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (!validarCPF(this.Persona.perCedula)) {
        this.toastr.error(
          'Digite correctamente su numero de identificación',
          'Cedula invalido',
          {
            timeOut: this.timeToastr,
          }
        );
        return false;
      }
    }

    //NOMBRES
    if (!this.Persona.perNombre) {
      this.toastr.error(
        'Nombre es un campo obligatorio',
        'Ingrese los nombres del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //FOTO
    if (!this.Usuario.foto) {
      this.toastr.info('No Olvide Ingresarla', 'Foto', {
        timeOut: this.timeToastr,
      });
    }

    //APELLIDOS
    if (!this.Persona.perApellido) {
      this.toastr.error(
        'Apellido es un campo obligatorio',
        'Ingrese los apellidos del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //FECHA DE NACIMIENTO
    if (calcularEdad(this.Persona.perFechaNacimiento) < this.edadMinima) {
      this.toastr.error('Debe ser mayor de edad para registrarse', '', {
        timeOut: 3000,
      });
      return false;
    }

    //TELEFONO
    if (!this.Persona.perTelefono) {
      this.toastr.error(
        'Teléfono es un campo obligatorio',
        'Ingrese el teléfono del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //DIRECCION
    if (!this.Persona.perDireccion) {
      this.toastr.error(
        'Dirección es un campo obligatorio',
        'Ingrese la dirección del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //NOMBRE DE USUARIO
    if (!this.Usuario.usuNombreUsuario) {
      this.toastr.error(
        'Nombre de usuario es un campo obligatorio',
        'Ingrese un nombre de usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    // CORREO ELECTRONICO

    if (!this.Usuario.usuCorreo) {
      this.toastr.error(
        'Correo es un campo obligatorio',
        'Ingrese el correo del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (!validarCorreo(this.Usuario.usuCorreo)) {
        this.toastr.error(
          'Digite correctamente el correo electronico',
          'Correo invalido',
          {
            timeOut: this.timeToastr,
          }
        );
        return false;
      }
    }

    //CONTRASEÑA
    if (!this.Usuario.usuContrasena && !this.editeMode) {
      this.toastr.error(
        'Contraseña es un campo obligatorio',
        'Ingrese la contraseña del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //CONFIRMACION DE CONTRASEÑA

    if (!this.confirmarPass && !this.editeMode) {
      this.toastr.error(
        'Es obligatorio confirmar la contraseña',
        'Confirme la contraseña',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (this.Usuario.usuContrasena !== this.confirmarPass) {
        this.toastr.error(
          'Las contraseñas no coinciden, digite correctamente',
          'La contraseñá no coincide',
          {
            timeOut: this.timeToastr,
          }
        );

        return false;
      }
    }

    //ROL
    if (this.Usuario.rolId.rolId <= 0) {
      this.toastr.error(
        'Debe seleccionar el rol del usuario',
        'Seleccione el rol',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    return true;
  }

  registrar() {
    if (this.validarRegistro()) {
      this.personaServie.cedulaUnica(this.Persona.perCedula?.trim() || '').subscribe((response) => {
        if (response) {
          this.usuarioService.usuarioUnico(this.Usuario.usuNombreUsuario?.trim() || '').subscribe((res) => {
            if (res) {
              const rolEncontrado = this.listaRoles.find(rol => rol.rolId.toString() === this.Usuario.rolId?.rolId.toString());

              if (rolEncontrado) {
                this.Usuario.rolId.rolNombre = rolEncontrado.rolNombre;
                //agregar foto
                this.Usuario.foto = this.base64Image;

                // REGISTRAR PERSONA
                this.personaServie.registrarPersona(this.Persona).subscribe((response) => {
                  this.Usuario.usuEstado = 1;
                  this.Usuario.usuPerId = response;

                  // REGISTRAR USUARIO
                  this.usuarioService.registrarUsuario(this.Usuario).subscribe((response) => {
                    Swal.fire({
                      title: '¡Registro Exitoso!',
                      text: `${this.Persona.perNombre} ${this.Persona.perApellido} (${this.Usuario.rolId.rolNombre}) agregado correctamente`,
                      icon: 'success',
                      confirmButtonText: 'Confirmar',
                      showCancelButton: false, // No mostrar el botón de cancelar
                    }).then(() => {
                      this.limpiarRegistro();
                      this.router.navigate(['/listausu']);
                    });
                  });
                });
              }
            } else {
              this.toastr.error('El nombre de usuario que ingresaste ya se encuentra registrado', 'Usuario duplicado', {
                timeOut: this.timeToastr,
              });
            }
          });
        } else {
          this.toastr.error('La cédula que ingresaste ya se encuentra registrada', 'Cédula duplicada', {
            timeOut: this.timeToastr,
          });
        }
      });
    }
  }

  limpiarRegistro() {
    this.Usuario = new Usuario();
    this.Persona = new Persona();
    this.confirmarPass = '';
  }
}
