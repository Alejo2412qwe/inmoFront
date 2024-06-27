import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private rolService: RolService,
    private toastr: ToastrService,
    private personaServie: PersonaService,
    private usuarioService: UsuarioService) {
  }

  rol: string = this.sessionStorage.getItem('rol') || '';
}
