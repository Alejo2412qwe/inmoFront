import { Component } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private sessionStorage: SessionStorageService) {
  }

  rol: string = this.sessionStorage.getItem('rol') || '';

  route(): string {
    return this.rol === 'Administrador' ? '/alugueis' : '/infoAluguel';
  }
}
