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

  rol: string = this.sessionStorage.getItem('rol') || '';

  ngOnInit(): void {
   this.loadData()
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

}
