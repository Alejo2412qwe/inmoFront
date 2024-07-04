import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluguel } from 'src/app/models/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';
import { EmailService } from 'src/app/services/emai.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-infoaluguel',
  templateUrl: './infoaluguel.component.html',
  styleUrls: ['./infoaluguel.component.css']
})
export class InfoaluguelComponent implements OnInit {

  constructor(private aluguelService: AluguelService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,
    private emailService: EmailService,
    private activatedRoute: ActivatedRoute, private router: Router,) { }

  isLoading: boolean = true;
  aluguel: Aluguel = new Aluguel();

  userId: number = this.sessionStorage.getItem('userId') || 0;
  rol: string = this.sessionStorage.getItem('rol') || '';

  selectedFile: File | null = null;
  base64Image: any;
  base64String: string = '';
  idAluguel!: number;

  ngOnInit() {
    this.loadData();
    this.activatedRoute.params.subscribe((params) => {
      this.idAluguel = params['id'];
    });
  }

  loadData() {
    const dataLoadPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.getAluguel();
        resolve();
      }, 2000);
    });
    dataLoadPromise.then(() => {
      this.isLoading = false;
    });
  }

  getAluguel() {
    if (this.rol == 'Inquilino') {
      this.aluguelService.getAluguelByInquilino(this.userId).subscribe((data) => {
        if (data) {
          this.aluguel = data
        } else {
          Swal.fire({
            title: "<strong>Ops!</strong>",
            icon: "info",
            html: `
            Mil desculpas, você ainda não tem aluguel aqui.<br>
            `,
            focusConfirm: false,
            confirmButtonText: `
              <i class="fa fa-thumbs-up"></i> OK!
            `
          }).then(() => {
            this.router.navigate(['/login']);
            this.sessionStorage.removeItem('userData')
          });;
        }
      })
    } else {
      this.aluguelService.findByAluId(this.idAluguel).subscribe((data) => {
        this.aluguel = data
      })
    }
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
      const aluId = id;
      this.aluguelService.updateComprovante(aluId, base64String).subscribe(
        () => {
          this.toastr.success("Prova enviada com sucesso.", "SUCESSO")
          this.aluguelService.findByAluId(id).subscribe((data) => {
            const mensaje = data.aluInquilino.usuPerId.perNombre + ' ' + data.aluInquilino.usuPerId.perApellido + ' carregou o comprovante de pagamento de seu aluguel.'
            this.sendEmailNotification(mensaje);
          })
          this.selectedFile = null;
          this.base64String = '';
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          this.toastr.error(error, 'Erro ao atualizar o comprovante de pagamento.');
        }
      );
    };
  }

  sendEmailNotification(mensaje: string) {
    this.emailService.sendEmail(mensaje).subscribe(
      () => console.log('Email enviado correctamente'),
      error => console.error('Error al enviar el email:', error)
    );
  }

}
