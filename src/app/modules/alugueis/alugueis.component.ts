import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { decodeBase64Download, decodeBase64PDF } from 'src/app/common/base64';
import { USER } from 'src/app/common/img64';
import { Aluguel } from 'src/app/models/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';

@Component({
  selector: 'app-alugueis',
  templateUrl: './alugueis.component.html',
  styleUrls: ['./alugueis.component.css']
})
export class AlugueisComponent implements OnInit {

  constructor(private aluguelService: AluguelService, private toastr: ToastrService,) { }

  page!: number;

  listAluguel: Aluguel[] = []

  estList: number = 1;
  userImg = USER
  searchString: string = '';

  ngOnInit(): void {
    this.loadAlugueis();
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

}
