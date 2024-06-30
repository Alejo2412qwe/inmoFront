import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/enviroment';
import { SessionStorageService } from './session-storage.service';
import { EmailRequest } from '../models/emailrequest';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    private url: string = `${entorno.urlPrivada}/email`;

    constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

    sendEmail(mensagem: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
        });
        const body = { mensagem };

        return this.http.post<EmailRequest>(`${this.url}/enviar`, body, { headers });
    }
}
