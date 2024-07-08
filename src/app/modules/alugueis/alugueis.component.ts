import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { base64PDFpreview, decodeBase64Download, decodeBase64PDF } from 'src/app/common/base64';
import { USER } from 'src/app/common/img64';
import { Aluguel } from 'src/app/models/aluguel';
import { Comprovante } from 'src/app/models/comprovante';
import { AluguelService } from 'src/app/services/aluguel.service';
import { ComprovanteService } from 'src/app/services/comprovante.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alugueis',
  templateUrl: './alugueis.component.html',
  styleUrls: ['./alugueis.component.css']
})
export class AlugueisComponent implements OnInit {

  constructor(private aluguelService: AluguelService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,
    private comprovanteService: ComprovanteService) { }

  isLoading: boolean = true;
  page!: number;

  listAluguel: Aluguel[] = []
  comprovante: Comprovante = new Comprovante();

  estList: number = 1;
  userImg = USER
  searchString: string = '';

  selectedFile: File | null = null;
  base64Image: any;
  base64String: string = '';

  rol: string = this.sessionStorage.getItem('rol') || '';

  ngOnInit(): void {
    this.loadData();
  }

  loadAlugueis(est: number) {
    if (est === 0 || est === 1) {
      this.aluguelService.allAlugueisData(est).subscribe((response) => {
        this.listAluguel = response;
      });
    } else {
      console.error('El valor de "est" debe ser 0 o 1.');
    }
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.loadAlugueis(this.estList);
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  cambiarEstList(est: number) {
    this.estList = est
    this.loadAlugueis(this.estList)
  }

  downloadImage(base64Data: string, name: string) {
    decodeBase64Download(base64Data, name, this.toastr)
  }


  downloadFile(base64Data: string, name: string) {
    decodeBase64PDF(base64Data, name, this.toastr)
  }

  downloadComprovante(id: number, filename: string) {
    this.comprovanteService.getComprovanteByComFechaRegistro(id).subscribe((data) => {
      if (data) {
        this.downloadImage(data.comComprovante, filename);
      } else {
        this.toastr.warning('Nenhum recibo foi encontrado.', 'AVISO');
      }
    })
  }

  searchAluguel(search: string, est: number) {
    this.aluguelService.searchAluguel(search, est).subscribe((response) => {
      this.listAluguel = response;

    });
  }

  updateEstAluguel(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'desativar'
    } else {
      mensaje = 'ativar'
    }
    Swal.fire({
      title: `Tem certeza de que deseja ${mensaje} o usuário?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sim, ${mensaje}`,
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.aluguelService.updateEst(id, est).subscribe({
          next: () => {
            this.loadAlugueis(est)
            this.estList = est;
            if (est === 0) {
              this.toastr.success('DESATIVADO COM SUCESSO', 'SUCESSO');
            } else {
              this.toastr.success('ATIVADO CORRETAMENTE', 'SUCESSO');
            }
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {
            // Manejar completado
          }
        });
      }
    });
  }

  onFileChange(id: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.convertToBase64(id);
    }
  }

  convertToBase64(id: number) {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const base64String = reader.result as string;
      this.aluguelService.updateContrato(id, base64String).subscribe(
        () => {
          this.toastr.success("Contrato enviado com sucesso.", "SUCESSO")
          const alugue = this.listAluguel.find(a => a.aluId === id);
          if (alugue) {
            alugue.aluContrato = base64String;
          }
          this.selectedFile = null;
          this.base64String = '';
        },
        (error) => {
          this.toastr.error(error, 'Erro ao atualizar o comprovante de pagamento.');
        }
      );
    };
  }

}
