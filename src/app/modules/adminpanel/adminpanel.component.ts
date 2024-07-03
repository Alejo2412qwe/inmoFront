import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AluguelService } from 'src/app/services/aluguel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor(private aluguelService: AluguelService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,
    private usuarioService: UsuarioService) { }

  usuarios!: number;
  aluguels!: number;

  ngOnInit(): void {
    this.getCantidades()
  }

  getCantidades() {
    this.aluguelService.getCantidadAluguels().subscribe((data) => {
      this.aluguels = data
    });

    this.usuarioService.getCantidadUsuarios().subscribe((data) => {
      this.usuarios = data
    });
  }

  showMensajeBienvendia() {

  }

}
