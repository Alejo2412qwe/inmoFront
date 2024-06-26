import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
})
export class CadUsuarioComponent implements OnInit {

  constructor(
    private sessionStorage: SessionStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rolService: RolService,
    private toastr: ToastrService,
    private personaServie: PersonaService,
    private usuarioService: UsuarioService) { }

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
}
