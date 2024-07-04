import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { decodeBase64Download, decodeBase64PDF } from 'src/app/common/base64';
import { USER } from 'src/app/common/img64';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  constructor(private UsuarioService: UsuarioService, private toastr: ToastrService,) { }

  page!: number;

  listaUsuarios: Usuario[] = []

  estList: number = 1;
  userImg = USER
  searchString: string = '';

  isLoading: boolean = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.loadUsers(1)
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  loadUsers(est: number) {
    if (est === 0 || est === 1) {
      this.UsuarioService.allUsersData(est).subscribe((response) => {
        this.listaUsuarios = response;
      });
    } else {
      console.error('El valor de "est" debe ser 0 o 1.');
    }
  }

  downloadImage(base64Data: string, name: string) {
    decodeBase64Download(base64Data, name, this.toastr)
  }


  downloadFile(base64Data: string, name: string) {
    decodeBase64PDF(base64Data, name, this.toastr)
  }

  searchUser(search: string, est: number) {
    this.UsuarioService.searchUsersData(search, est).subscribe((response) => {
      this.listaUsuarios = response;

    });
  }

  cambiarEstList(est: number) {
    this.estList = est
    this.loadUsers(this.estList)
  }

  updateEstUser(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'desativar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `Tem certeza de que deseja ${mensaje} o usuário?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UsuarioService.updateEst(id, est).subscribe({
          next: () => {
            this.loadUsers(est)
            this.estList = est;
            if (est === 0) {
              this.toastr.success('DESATIVADO COM SUCESSO', 'SUCESSO');
            } else {
              this.toastr.success('ATIVADO CORRETAMENTE', 'SUCESSO');
            }
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {
            // Manejar completado
          }
        });
      }
    });
  }

}
