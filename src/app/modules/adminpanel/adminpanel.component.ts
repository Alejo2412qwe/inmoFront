import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AluguelService } from 'src/app/services/aluguel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
})
export class AdminpanelComponent implements OnInit {
  constructor(
    private aluguelService: AluguelService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,
    private usuarioService: UsuarioService
  ) { }

  usuarios!: number;
  aluguels!: number;
  suma!: number;
  desconto!: number;
  selectedDiscount: number = 10;
  discountOptions: number[] = [5, 10, 15, 20, 25, 30];

  ngOnInit(): void {
    this.showMensajeBienvendia();
    this.getCantidades();
  }

  getCantidades() {
    this.aluguelService.getCantidadAluguels().subscribe((data) => {
      this.aluguels = data;
    });

    this.usuarioService.getCantidadUsuarios().subscribe((data) => {
      this.usuarios = data;
    });

    this.aluguelService.getSumaValores(1).subscribe((data) => {
      if (data) {
        this.suma = data;
        this.updateDiscount();
      }
    });
  }

  updateDiscount() {
    this.desconto = this.calculateDiscount(this.suma, this.selectedDiscount);
  }

  calculateDiscount(value: number, percent: number): number {
    return value * (percent / 100);
  }

  calcularDezPercent(value: number): number {
    return value * 0.1;
  }

  showMensajeBienvendia() {
    Swal.fire({
      title: 'BEM-VINDO, PROPRIETÁRIO DA EMPRESA',
      text: 'Aqui você pode visualizar dados importantes para você!',
      imageUrl: 'assets/imgs/inmoLOGO.jpeg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      backdrop: `
      #fff
      `,
      confirmButtonText: `
      <i class="fa fa-thumbs-up"></i> OBRIGADO!
    `,
    });
  }
}