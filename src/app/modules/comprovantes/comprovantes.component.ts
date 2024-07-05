import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { decodeBase64Download } from 'src/app/common/base64';
import { USER } from 'src/app/common/img64';
import { Comprovante } from 'src/app/models/comprovante';
import { AluguelService } from 'src/app/services/aluguel.service';
import { ComprovanteService } from 'src/app/services/comprovante.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-comprovantes',
  templateUrl: './comprovantes.component.html',
  styleUrls: ['./comprovantes.component.css']
})
export class ComprovantesComponent implements OnInit {


  constructor(private aluguelService: AluguelService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,
    private comprovanteService: ComprovanteService) { }

  isLoading: boolean = true;
  page!: number;

  listComprobante: Comprovante[] = []

  estList: number = 1;
  userImg = USER
  searchString: string = '';

  selectedFile: File | null = null;
  base64Image: any;
  base64String: string = '';
  timeToastr: number = 4000;

  selectedDay: string = '';
  selectedMonth: string = '';
  selectedYear: string = '';

  days: number[] = [];
  months: { name: string, value: number }[] = [
    { name: 'Janeiro', value: 1 },
    { name: 'Fevereiro', value: 2 },
    { name: 'Março', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Maio', value: 5 },
    { name: 'Junho', value: 6 },
    { name: 'Julho', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setembro', value: 9 },
    { name: 'Outubro', value: 10 },
    { name: 'Novembro', value: 11 },
    { name: 'Dezembro', value: 12 },
  ];
  years: number[] = [];

  rol: string = this.sessionStorage.getItem('rol') || '';

  ngOnInit(): void {
    this.loadData();
    this.populateDays();
    this.populateYears();
  }

  populateDays() {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      this.years.push(i);
    }
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.getAllComprovantes()
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  downloadImage(base64Data: string, name: string) {
    decodeBase64Download(base64Data, name, this.toastr)
  }

  getAllComprovantes() {
    this.comprovanteService.getComprovantes().subscribe((data) => {
      if (data) {
        this.listComprobante = data
      }
    })
  }

  validar(dia: number, mes: number, year: number): boolean {

    if (!dia) {
      this.toastr.warning(
        'DIA é um campo obrigatório',
        'AVISO',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    if (!mes) {
      this.toastr.warning(
        'MÊS é um campo obrigatório',
        'AVISO',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    if (!year) {
      this.toastr.warning(
        'ANO é um campo obrigatório',
        'AVISO',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    return true;
  }

  search() {
    let dia = parseInt(this.selectedDay)
    let month = parseInt(this.selectedMonth)
    let year = parseInt(this.selectedYear)
    if (this.validar(dia, month, year)) {
      this.comprovanteService.findComprovantesByFechaPartesAndInquilino(dia, month, year).subscribe((data) => {
        if (data) {
          this.listComprobante = this.filterComprovantes(data, this.searchString);
        }
      })
    }
  }

  limpar() {
    this.selectedDay = '';
    this.selectedMonth = '';
    this.selectedYear = '';
    this.searchString = '';
    this.getAllComprovantes();
  }

  filterComprovantes(comprovantes: Comprovante[], searchString: string): Comprovante[] {
    if (!searchString) {
      return comprovantes;
    }

    const lowerSearchString = searchString.toLowerCase();

    return comprovantes.filter(comprovante =>
      comprovante.aluId.aluInquilino.usuPerId.perNombre.toLowerCase().includes(lowerSearchString) ||
      comprovante.aluId.aluInquilino.usuPerId.perApellido.toLowerCase().includes(lowerSearchString) ||
      (comprovante.comFechaRegistro &&
        new Date(comprovante.comFechaRegistro).toLocaleDateString().toLowerCase().includes(lowerSearchString))
    );
  }

}
