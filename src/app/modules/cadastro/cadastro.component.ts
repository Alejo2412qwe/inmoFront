import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluguel } from 'src/app/models/aluguel';
import { Usuario } from 'src/app/models/usuario';
import { AluguelService } from 'src/app/services/aluguel.service';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private rolService: RolService,
    private toastr: ToastrService,
    private personaServie: PersonaService,
    private usuarioService: UsuarioService,
    private aluguelService: AluguelService) {
  }

  ngOnInit(): void {
    this.loadProp();
    this.loadInqui();
  }

  timeToastr: number = 4000;

  aluguel: Aluguel = new Aluguel();
  Usuario: Usuario = new Usuario();
  uploadedFiles: File[] = [];

  selectedFileEntrada: File | undefined = undefined;
  selectedFileSaida: File | undefined = undefined;
  selectedFileContrato: File | undefined = undefined;
  base64StringEntrada: string = '';
  base64StringSaida: string = '';
  base64StringContrato: string = '';

  listPropietarios: Usuario[] = []
  listInquilinos: Usuario[] = []

  rol: string = this.sessionStorage.getItem('rol') || '';

  loadProp() {
    this.usuarioService.getUsersByRol(3,1).subscribe((users) => {
      this.listPropietarios = users;
    })
  }

  loadInqui() {
    this.usuarioService.getUsersByRol(4,1).subscribe((users) => {
      this.listInquilinos = users;
    })
  }

  onFileChangeEntrada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileEntrada = input.files[0];
      this.convertToBase64Entrada();
    }
  }

  convertToBase64Entrada() {
    if (!this.selectedFileEntrada) {
      console.error('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileEntrada);
    reader.onload = () => {
      this.base64StringEntrada = reader.result as string;
      this.aluguel.aluFotoEntrada = this.base64StringEntrada;
    };
  }

  removeEntrada() {
    this.aluguel.aluFotoEntrada = '';
    const fileInput = document.getElementById('uploadEntrada') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onFileChangeSaida(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileSaida = input.files[0];
      this.convertToBase64Saida();
    }
  }

  convertToBase64Saida() {
    if (!this.selectedFileSaida) {
      console.error('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileSaida);
    reader.onload = () => {
      this.base64StringSaida = reader.result as string;
      this.aluguel.aluFotoSaida = this.base64StringSaida;
    };
  }

  removeSaida() {
    this.aluguel.aluFotoSaida = '';
    const fileInput = document.getElementById('uploadSaida') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onFileChangeContrato(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileContrato = input.files[0];
      this.convertToBase64Contrato();
    }
  }

  convertToBase64Contrato() {
    if (!this.selectedFileContrato) {
      console.error('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileContrato);
    reader.onload = () => {
      this.base64StringContrato = reader.result as string;
      this.aluguel.aluContrato = this.base64StringContrato;
    };
  }

  removeContrato() {
    this.aluguel.aluContrato = '';
    const fileInput = document.getElementById('contrato') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  validarRegistro(): boolean {
    //endereço
    if (!this.aluguel.aluEndereco) {
      this.toastr.error(
        'Endereço é um campo obrigatório',
        'Digite um endereço',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //propietario
    if (!this.aluguel.aluPropietario) {
      this.toastr.error(
        'Deve selecionar um proprietário',
        'Selecione um proprietário',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //inquilino
    if (!this.aluguel.aluPropietario) {
      this.toastr.error(
        'Deve selecionar um inquilino',
        'Selecione um inquilino',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //expiraçao
    if (!this.aluguel.aluExpiracao) {
      this.toastr.error(
        'Deve inserir a data de validade',
        'Expiração',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //foto entrada
    if (!this.aluguel.aluFotoEntrada) {
      this.toastr.error(
        'Deve inserir a foto de entrada',
        'Foto De Entrada',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //foto saida
    if (!this.aluguel.aluFotoSaida) {
      this.toastr.error(
        'Deve inserir a foto de saida',
        'Foto De Saida',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //contrato
    if (!this.aluguel.aluContrato) {
      this.toastr.error(
        'Deve inserir o contrato',
        'Contrato',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    return true;
  }

  registrar() {
    this.aluguelService.inquilinoUnico(this.aluguel.aluInquilino.usuId).subscribe((response) => {
      if (response) {
        this.aluguel.aluEstado = 1;
        this.aluguelService.registrarAluguel(this.aluguel).subscribe(() => {
          Swal.fire({
            title: '¡Registro bem-sucedido!',
            text: `Aluguel adicionado com sucesso`,
            icon: 'success',
            confirmButtonText: 'Confirme',
            showCancelButton: false, // No mostrar el botón de cancelar
          }).then(() => {
            this.limpiarRegistro();
            this.router.navigate(['/alugueis']);
          });
        })
      } else {
        this.toastr.error('O inquilino que você está tentando selecionar já possui um aluguel em seu nome.', 'Erro ao cadastrar imóvel')
      }
    })
  }

  limpiarRegistro() {
    this.Usuario = new Usuario();
    this.aluguel = new Aluguel();
    this.base64StringContrato = '';
    this.base64StringEntrada = '';
    this.base64StringSaida = '';
    this.selectedFileEntrada = undefined;
    this.selectedFileContrato = undefined;
    this.selectedFileSaida = undefined;
  }
}
