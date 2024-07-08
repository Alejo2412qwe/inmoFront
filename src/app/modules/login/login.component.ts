import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/models/loginRequest';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,
  ) { }

  ngOnInit(): void {
    this.sessionStorage.clear();
  }

  route!: string;

  decodeToken(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken) {
        const rol = decodedToken['rol'];
        this.sessionStorage.setItem('rol', rol[0].authority);

        const username = decodedToken['sub'];
        this.sessionStorage.setItem('username', username);

        const userId = decodedToken['id'];
        this.sessionStorage.setItem('userId', userId);

        const tiempoRestante = decodedToken['exp'] - Math.floor(Date.now() / 1000);
        this.sessionStorage.setItem('tiempoRestante', tiempoRestante.toString());

      } else {
        console.error("Token inválido o no contiene información de rol.");
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  logIn() {
    this.usuarioService.usuarioValido(this.loginRequest.usuNombreUsuario?.trim() || '').subscribe(
      res => {
        if (res) {
          this.usuarioService.logIn(this.loginRequest).subscribe(
            response => {
              if (response && response.token) {
                this.sessionStorage.setItem('token', response.token);
                this.decodeToken(response.token);
                Swal.fire({
                  title: '¡Login realizado con éxito!',
                  text: 'BEM-VINDO, ' + this.loginRequest.usuNombreUsuario + '.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  showCancelButton: false,
                }).then(() => {
                  if (this.sessionStorage.getItem('rol') == 'Inquilino') {
                    this.route = '/infoAluguel/' + this.sessionStorage.getItem('userId');
                    this.router.navigate([this.route]);
                  } else {
                    this.router.navigate(['/nav']);
                  }
                });
              } else {
                alert('user not found');
              }
            },
            error => {
              console.error("Error en el login:", error);
              this.toastr.error('Error al iniciar sesión, por favor intente de nuevo.');
            }
          );
        } else {
          this.toastr.error('El usuario que ingreso no se encuentra registrado, digite correctamente', 'Nombre de usuario incorrecto', {
            timeOut: 4000
          });
        }
      },
      error => {
        console.error("Error al validar usuario:", error);
        this.toastr.error('Error al validar usuario, por favor intente de nuevo.');
      }
    );
  }
}
