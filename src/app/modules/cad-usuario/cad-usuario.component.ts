import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { base64ToFile } from 'src/app/common/base64';
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
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,) {
  }

  estados: { name: string, value: number }[] = [
    { name: 'Solteir@', value: 1 },
    { name: 'Casad@', value: 2 },
    { name: 'Viúv@', value: 3 },
    { name: 'Divorciad@', value: 4 },
  ];

  pais: { name: string, value: number }[] = [
    { name: 'Afeganistão', value: 1 },
    { name: 'Albânia', value: 2 },
    { name: 'Argélia', value: 3 },
    { name: 'Andorra', value: 4 },
    { name: 'Angola', value: 5 },
    { name: 'Antígua e Barbuda', value: 6 },
    { name: 'Argentina', value: 7 },
    { name: 'Armênia', value: 8 },
    { name: 'Austrália', value: 9 },
    { name: 'Áustria', value: 10 },
    { name: 'Azerbaijão', value: 11 },
    { name: 'Bahamas', value: 12 },
    { name: 'Bahrein', value: 13 },
    { name: 'Bangladesh', value: 14 },
    { name: 'Barbados', value: 15 },
    { name: 'Bielorrússia', value: 16 },
    { name: 'Bélgica', value: 17 },
    { name: 'Belize', value: 18 },
    { name: 'Benin', value: 19 },
    { name: 'Butão', value: 20 },
    { name: 'Bolívia', value: 21 },
    { name: 'Bósnia e Herzegovina', value: 22 },
    { name: 'Botswana', value: 23 },
    { name: 'Brasil', value: 24 },
    { name: 'Brunei', value: 25 },
    { name: 'Bulgária', value: 26 },
    { name: 'Burkina Faso', value: 27 },
    { name: 'Burundi', value: 28 },
    { name: 'Cabo Verde', value: 29 },
    { name: 'Camboja', value: 30 },
    { name: 'Camarões', value: 31 },
    { name: 'Canadá', value: 32 },
    { name: 'Chade', value: 33 },
    { name: 'Chile', value: 34 },
    { name: 'China', value: 35 },
    { name: 'Colômbia', value: 36 },
    { name: 'Comores', value: 37 },
    { name: 'Congo', value: 38 },
    { name: 'Costa Rica', value: 39 },
    { name: 'Croácia', value: 40 },
    { name: 'Cuba', value: 41 },
    { name: 'Chipre', value: 42 },
    { name: 'Tchéquia', value: 43 },
    { name: 'Dinamarca', value: 44 },
    { name: 'Djibuti', value: 45 },
    { name: 'Dominica', value: 46 },
    { name: 'República Dominicana', value: 47 },
    { name: 'Equador', value: 48 },
    { name: 'Egito', value: 49 },
    { name: 'El Salvador', value: 50 },
    { name: 'Guiné Equatorial', value: 51 },
    { name: 'Eritreia', value: 52 },
    { name: 'Estônia', value: 53 },
    { name: 'Eswatini', value: 54 },
    { name: 'Etiópia', value: 55 },
    { name: 'Fiji', value: 56 },
    { name: 'Finlândia', value: 57 },
    { name: 'França', value: 58 },
    { name: 'Gabão', value: 59 },
    { name: 'Gâmbia', value: 60 },
    { name: 'Geórgia', value: 61 },
    { name: 'Alemanha', value: 62 },
    { name: 'Gana', value: 63 },
    { name: 'Grécia', value: 64 },
    { name: 'Granada', value: 65 },
    { name: 'Guatemala', value: 66 },
    { name: 'Guiné', value: 67 },
    { name: 'Guiné-Bissau', value: 68 },
    { name: 'Guiana', value: 69 },
    { name: 'Haiti', value: 70 },
    { name: 'Honduras', value: 71 },
    { name: 'Hungria', value: 72 },
    { name: 'Islândia', value: 73 },
    { name: 'Índia', value: 74 },
    { name: 'Indonésia', value: 75 },
    { name: 'Irã', value: 76 },
    { name: 'Iraque', value: 77 },
    { name: 'Irlanda', value: 78 },
    { name: 'Israel', value: 79 },
    { name: 'Itália', value: 80 },
    { name: 'Jamaica', value: 81 },
    { name: 'Japão', value: 82 },
    { name: 'Jordânia', value: 83 },
    { name: 'Cazaquistão', value: 84 },
    { name: 'Quênia', value: 85 },
    { name: 'Kiribati', value: 86 },
    { name: 'Coreia do Norte', value: 87 },
    { name: 'Coreia do Sul', value: 88 },
    { name: 'Kosovo', value: 89 },
    { name: 'Kuwait', value: 90 },
    { name: 'Quirguistão', value: 91 },
    { name: 'Laos', value: 92 },
    { name: 'Letônia', value: 93 },
    { name: 'Líbano', value: 94 },
    { name: 'Lesoto', value: 95 },
    { name: 'Libéria', value: 96 },
    { name: 'Líbia', value: 97 },
    { name: 'Liechtenstein', value: 98 },
    { name: 'Lituânia', value: 99 },
    { name: 'Luxemburgo', value: 100 },
    { name: 'Madagascar', value: 101 },
    { name: 'Malawi', value: 102 },
    { name: 'Malásia', value: 103 },
    { name: 'Maldivas', value: 104 },
    { name: 'Mali', value: 105 },
    { name: 'Malta', value: 106 },
    { name: 'Ilhas Marshall', value: 107 },
    { name: 'Mauritânia', value: 108 },
    { name: 'Maurício', value: 109 },
    { name: 'México', value: 110 },
    { name: 'Micronésia', value: 111 },
    { name: 'Moldávia', value: 112 },
    { name: 'Mônaco', value: 113 },
    { name: 'Mongólia', value: 114 },
    { name: 'Montenegro', value: 115 },
    { name: 'Marrocos', value: 116 },
    { name: 'Moçambique', value: 117 },
    { name: 'Mianmar', value: 118 },
    { name: 'Namíbia', value: 119 },
    { name: 'Nauru', value: 120 },
    { name: 'Nepal', value: 121 },
    { name: 'Países Baixos', value: 122 },
    { name: 'Nova Zelândia', value: 123 },
    { name: 'Nicarágua', value: 124 },
    { name: 'Níger', value: 125 },
    { name: 'Nigéria', value: 126 },
    { name: 'Macedônia do Norte', value: 127 },
    { name: 'Noruega', value: 128 },
    { name: 'Omã', value: 129 },
    { name: 'Paquistão', value: 130 },
    { name: 'Palau', value: 131 },
    { name: 'Panamá', value: 132 },
    { name: 'Papua Nova Guiné', value: 133 },
    { name: 'Paraguai', value: 134 },
    { name: 'Peru', value: 135 },
    { name: 'Filipinas', value: 136 },
    { name: 'Polônia', value: 137 },
    { name: 'Portugal', value: 138 },
    { name: 'Catar', value: 139 },
    { name: 'Romênia', value: 140 },
    { name: 'Rússia', value: 141 },
    { name: 'Ruanda', value: 142 },
    { name: 'São Cristóvão e Neves', value: 143 },
    { name: 'Santa Lúcia', value: 144 },
    { name: 'São Vicente e Granadinas', value: 145 },
    { name: 'Samoa', value: 146 },
    { name: 'San Marino', value: 147 },
    { name: 'São Tomé e Príncipe', value: 148 },
    { name: 'Arábia Saudita', value: 149 },
    { name: 'Senegal', value: 150 },
    { name: 'Sérvia', value: 151 },
    { name: 'Seychelles', value: 152 },
    { name: 'Serra Leoa', value: 153 },
    { name: 'Singapura', value: 154 },
    { name: 'Eslováquia', value: 155 },
    { name: 'Eslovênia', value: 156 },
    { name: 'Ilhas Salomão', value: 157 },
    { name: 'Somália', value: 158 },
    { name: 'África do Sul', value: 159 },
    { name: 'Sudão do Sul', value: 160 },
    { name: 'Espanha', value: 161 },
    { name: 'Sri Lanka', value: 162 },
    { name: 'Sudão', value: 163 },
    { name: 'Suriname', value: 164 },
    { name: 'Suécia', value: 165 },
    { name: 'Suíça', value: 166 },
    { name: 'Síria', value: 167 },
    { name: 'Tadjiquistão', value: 168 },
    { name: 'Tanzânia', value: 169 },
    { name: 'Tailândia', value: 170 },
    { name: 'Timor-Leste', value: 171 },
    { name: 'Togo', value: 172 },
    { name: 'Tonga', value: 173 },
    { name: 'Trindade e Tobago', value: 174 },
    { name: 'Tunísia', value: 175 },
    { name: 'Turquia', value: 176 },
    { name: 'Turquemenistão', value: 177 },
    { name: 'Tuvalu', value: 178 },
    { name: 'Uganda', value: 179 },
    { name: 'Ucrânia', value: 180 },
    { name: 'Emirados Árabes Unidos', value: 181 },
    { name: 'Reino Unido', value: 182 },
    { name: 'Estados Unidos', value: 183 },
    { name: 'Uruguai', value: 184 },
    { name: 'Uzbequistão', value: 185 },
    { name: 'Vanuatu', value: 186 },
    { name: 'Vaticano', value: 187 },
    { name: 'Venezuela', value: 188 },
    { name: 'Vietnã', value: 189 },
    { name: 'Iêmen', value: 190 },
    { name: 'Zâmbia', value: 191 },
    { name: 'Zimbábue', value: 192 }
  ];

  ngOnInit(): void {
    this.loadFunção();
    this.validateMode();
  }

  Usuario: Usuario = new Usuario();
  Persona: Persona = new Persona()
  uploadedFiles: File[] = [];

  listaRoles: Rol[] = []

  confirmarPass: string = '';
  timeToastr: number = 4000;
  edadMinima = 18;
  id: number = 0;
  editeMode: boolean = false;
  mode: string = ''

  selectedFile: File | undefined = undefined;
  base64Image: any;
  base64String: string = '';

  rol: string = this.sessionStorage.getItem('rol') || '';

  validateMode() {
    this.activatedRoute.params.subscribe((params) => {

      this.mode = params['mode'];

      switch (this.mode) {

        case "edit-user":
          this.id = params['id'];

          if (this.id !== undefined) {
            this.editeMode = true;
            this.loadEdit(this.id);
          }
          break;
        default:
          console.log("Opción no reconocida");
      }

    });
  }

  loadEdit(idUser: number) {
    this.usuarioService.searchUsersId(idUser).subscribe((response) => {
      this.Usuario = response;
      this.Persona = response.usuPerId;

      // Verificar si se ha subido una foto
      if (response.foto) {
        this.uploadedFiles.push(base64ToFile(response.foto, response.usuNombreUsuario));
      }

      // Limpiar la contraseña
      this.Usuario.usuContrasena = '';

      // Actualizar el nombre del rol del usuario
      const rolEncontrado = this.listaRoles.find(
        (rol) => rol.rolId.toString() === this.Usuario.rolId?.rolId.toString()
      );
      if (rolEncontrado) {
        this.Usuario.rolId.rolNombre = rolEncontrado.rolNombre;
      }
    });
  }

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
        'CPF é um campo obrigatório',
        'Digite um número de identificação',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (!validarCPF(this.Persona.perCedula)) {
        this.toastr.error(
          'Digite seu número de identificação corretamente',
          'CPF Inválido',
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
        'O nome é um campo obrigatório',
        'Digite os nomes do usuário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //FOTO
    if (!this.Usuario.foto) {
      this.toastr.info('Não se esqueça da foto', 'Foto', {
        timeOut: this.timeToastr,
      });
    }

    //APELLIDOS
    if (!this.Persona.perApellido) {
      this.toastr.error(
        'O sobrenome é um campo obrigatório',
        'Digite o sobrenome do usuário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //FECHA DE NACIMIENTO
    if (calcularEdad(this.Persona.perFechaNacimiento) < this.edadMinima) {
      this.toastr.error('Você deve ser maior de idade para se registrar', '', {
        timeOut: 3000,
      });
      return false;
    }

    //TELEFONO
    if (!this.Persona.perTelefono) {
      this.toastr.error(
        'Telefone é um campo obrigatório',
        'Digite o número de telefone do usuário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //DIRECCION
    if (!this.Persona.perDireccion) {
      this.toastr.error(
        'O endereço é um campo obrigatório',
        'Digite o endereço do usuário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //NOMBRE DE USUARIO
    if (!this.Usuario.usuNombreUsuario) {
      this.toastr.error(
        'O nome de usuário é um campo obrigatório',
        'Digite um nome de usuário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    // CORREO ELECTRONICO

    if (!this.Usuario.usuCorreo) {
      this.toastr.error(
        'E-mail é um campo obrigatório',
        'Digite o e-mail do usuário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (!validarCorreo(this.Usuario.usuCorreo)) {
        this.toastr.error(
          'Digite o e-mail corretamente',
          'E-mail inválido',
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
        'Senha é um campo obrigatório',
        'Digite a senha do usuário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //CONFIRMACION DE CONTRASEÑA

    if (!this.confirmarPass && !this.editeMode) {
      this.toastr.error(
        'A confirmação da senha é necessária',
        'Confirme sua senha',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (this.Usuario.usuContrasena !== this.confirmarPass) {
        this.toastr.error(
          'As senhas não coincidem, digite corretamente',
          'Senha não corresponde',
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
        'Você deve selecionar a função do usuário',
        'Selecione a função',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    return true;
  }

  editar() {
    if (this.validarRegistro()) {
      const rolEncontrado = this.listaRoles.find(
        (rol) => rol.rolId.toString() === this.Usuario.rolId?.rolId.toString()
      );
      if (rolEncontrado) {
        this.Usuario.rolId.rolNombre = rolEncontrado.rolNombre;
        //agregar foto
        this.Usuario.foto = this.base64Image;

        //REGISTRAR PERSONA
        this.personaServie
          .update(this.Persona.perId, this.Persona)
          .subscribe((response) => {
            this.Usuario.usuEstado = 1;
            this.Usuario.usuPerId = response;

            //RESGISTRAR USUARIO
            this.usuarioService
              .update(this.Usuario.usuId, this.Usuario)
              .subscribe((response) => {
                Swal.fire({
                  title: '¡Edição De Sucesso!',
                  text: `${this.Persona.perNombre} ${this.Persona.perApellido} (${this.Usuario.rolId.rolNombre}) atualizado com sucesso`,
                  icon: 'success',
                  confirmButtonText: 'Confirme',
                  showCancelButton: false,
                }).then(() => {
                  this.limpiarRegistro();
                  switch (this.mode) {

                    case "edit-user":
                      this.router.navigate(['/usuarios']);

                      break;
                    default:
                      this.router.navigate(['/nav']);
                  }

                });
              });
          });

        // return true
      }
    }
  }

  registrar() {
    if (this.validarRegistro()) {
      this.personaServie.cedulaUnica(this.Persona.perCedula?.trim() || '').subscribe((response) => {
        if (response) {
          this.personaServie.rgUnico(this.Persona.perRG?.trim() || '').subscribe((resp) => {
            if (resp) {
              this.usuarioService.usuarioUnico(this.Usuario.usuNombreUsuario?.trim() || '').subscribe((res) => {
                if (res) {
                  const rolEncontrado = this.listaRoles.find(rol => rol.rolId.toString() === this.Usuario.rolId?.rolId.toString());

                  if (rolEncontrado) {
                    if (rolEncontrado.rolNombre == 'Dono') {
                      Swal.fire({
                        title: "Você está tentando adicionar um proprietário de empresa, se desejar, será necessário inserir a senha do proprietário",
                        input: "text",
                        inputAttributes: {
                          autocapitalize: "off"
                        },
                        showCancelButton: true,
                        confirmButtonText: `
              <i class="fa fa-thumbs-up"></i> Continuar
            `,
                        showLoaderOnConfirm: true,
                        preConfirm: (senha) => {
                          return senha;
                        },
                      }).then((result) => {
                        if (result.isConfirmed) {
                          this.usuarioService.senhaDono(result.value).subscribe((response) => {
                            if (response) {
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
                                    title: '¡Registro bem-sucedido!',
                                    text: `${this.Persona.perNombre} ${this.Persona.perApellido} (${this.Usuario.rolId.rolNombre}) adicionado com sucesso`,
                                    icon: 'success',
                                    confirmButtonText: 'Confirmar',
                                    showCancelButton: false,
                                  }).then(() => {
                                    this.limpiarRegistro();
                                    this.router.navigate(['/usuarios']);
                                  });
                                });
                              });
                            } else {
                              Swal.fire({
                                title: 'Senha incorreta',
                                text: 'A senha inserida está incorreta. Por favor, tente novamente.',
                                icon: 'error',
                                confirmButtonText: 'OK'
                              });
                            }
                          })
                        }
                      })
                    } else {
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
                            title: '¡Registro bem-sucedido!',
                            text: `${this.Persona.perNombre} ${this.Persona.perApellido} (${this.Usuario.rolId.rolNombre}) adicionado com sucesso`,
                            icon: 'success',
                            confirmButtonText: 'Confirmar',
                            showCancelButton: false,
                          }).then(() => {
                            this.limpiarRegistro();
                            this.router.navigate(['/usuarios']);
                          });
                        });
                      });
                    }
                  }
                } else {
                  this.toastr.error('O nome de usuário que você digitou já está registrado', 'Usuário duplicado', {
                    timeOut: this.timeToastr,
                  });
                }
              });
            } else {
              this.toastr.error('O RG que você digitou já está cadastrado', 'CPF duplicado', {
                timeOut: this.timeToastr,
              });
            }
          })
        } else {
          this.toastr.error('O CPF que você digitou já está cadastrado', 'CPF duplicado', {
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
