import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Aluguel } from 'src/app/models/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-infoaluguel',
  templateUrl: './infoaluguel.component.html',
  styleUrls: ['./infoaluguel.component.css']
})
export class InfoaluguelComponent implements OnInit {

  constructor(private aluguelService: AluguelService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService) { }

  isLoading: boolean = true;
  aluguel: Aluguel = new Aluguel();

  userId: number = this.sessionStorage.getItem('userId') || 0;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.getAluguelByInquilino();
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  getAluguelByInquilino() {
    this.aluguelService.getAluguelByInquilino(this.userId).subscribe((data) => {
      this.aluguel = data
    })
  }

}
