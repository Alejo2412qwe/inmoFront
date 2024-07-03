import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { base64PDFpreview, decodeBase64Download, decodeBase64PDF } from 'src/app/common/base64';
import { USER } from 'src/app/common/img64';
import { Aluguel } from 'src/app/models/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-alugueis',
  templateUrl: './alugueis.component.html',
  styleUrls: ['./alugueis.component.css']
})
export class AlugueisComponent implements OnInit {

  constructor(private aluguelService: AluguelService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService) { }

  isLoading: boolean = true;
  page!: number;

  listAluguel: Aluguel[] = []

  estList: number = 1;
  userImg = USER
  searchString: string = '';

  rol: string = this.sessionStorage.getItem('rol') || '';

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.loadAlugueis();
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  loadAlugueis() {
    this.aluguelService.getAllAlugueis().subscribe((data) => { this.listAluguel = data })
  }

  downloadImage(base64Data: string, name: string) {
    decodeBase64Download(base64Data, name, this.toastr)
  }


  downloadFile(base64Data: string, name: string) {
    decodeBase64PDF(base64Data, name, this.toastr)
  }

  previewBase64PDF(base64: string, filename: string) {
    base64PDFpreview(base64, filename)
  }

  searchAluguel(search: string, est: number) {
    this.aluguelService.searchAluguel(search, est).subscribe((response) => {
      this.listAluguel = response;

    });
  }

}
