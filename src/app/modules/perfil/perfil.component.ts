import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private rolService: RolService,
    private toastr: ToastrService,
    private personaServie: PersonaService,
    private usuarioService: UsuarioService) {
  }

  isLoading: boolean = true;
  usuario: Usuario = new Usuario();

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.loadInfo();
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  userId: number = this.sessionStorage.getItem('userId') || 0;

  loadInfo() {
    this.usuarioService.searchUsersId(this.userId).subscribe((user) => {
      this.usuario = user
    })
  }

}
