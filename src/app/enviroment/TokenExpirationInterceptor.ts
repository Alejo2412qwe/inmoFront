import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {

                    // Verifica el tipo de solicitud y configura el mensaje en consecuencia
                    if (request.url.includes('/login')) {

                        this.toastr.error('Digite corretamente', 'Senha incorreta', {
                            timeOut: 4000
                        });
                    }
                    else {
                        Swal.fire({
                            title: '¡Sua sessão expirou!',
                            text: 'Faça login novamente para continuar.',
                            icon: 'warning',
                            confirmButtonText: 'Iniciar sessão',
                            showCancelButton: false, // No mostrar el botón de cancelar
                        }).then(() => {
                            // Redirige al usuario a la página de inicio de sesión.
                            this.router.navigate(['/login']);
                        });
                    }


                }
                return throwError(error);
            })
        );
    }
}