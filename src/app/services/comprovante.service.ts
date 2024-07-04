import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComponentRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/enviroment';
import { Comprovante } from '../models/comprovante';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class ComprovanteService {
    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) { }

    private url: string = `${entorno.urlPrivada}/comprovante`;

    registrarComprovante(com: Comprovante): Observable<Comprovante> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.post<Comprovante>(`${this.url}/create`, com, { headers });
    }

    getComprovanteByAluId(id: number): Observable<Comprovante> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Comprovante>(`${this.url}/getComprovanteByAluId?id=${id}`, { headers });
    }

    getComprovanteByComFechaRegistro(id: number): Observable<Comprovante> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Comprovante>(`${this.url}/getComprovanteByComFechaRegistro?id=${id}`, { headers });
    }

    getComprovantes() {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Comprovante[]>(`${this.url}/read`, {
            headers,
        });
    }


}
