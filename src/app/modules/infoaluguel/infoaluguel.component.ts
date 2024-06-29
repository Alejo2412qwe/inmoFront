import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infoaluguel',
  templateUrl: './infoaluguel.component.html',
  styleUrls: ['./infoaluguel.component.css']
})
export class InfoaluguelComponent implements OnInit {

  isLoading: boolean = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        alert('YA CARGOOooooooooooo')
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }



}
