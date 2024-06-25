import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buttom-menu',
  templateUrl: './buttom-menu.component.html',
  styleUrls: ['./buttom-menu.component.css']
})
export class ButtomMenuComponent {

  currentRoute: any;

  constructor(
    private router: Router,
    private toastr: ToastrService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  salir(): void {
    this.toastr.info('A sessão foi encerrada');
    this.cerrarSesion();
    this.router.navigate(['/login']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('userData');
  }
}
