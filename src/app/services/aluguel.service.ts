import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { entorno } from '../enviroment/enviroment';
import { Aluguel } from '../models/aluguel';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AluguelService {
    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) { }

    private url: string = `${entorno.urlPrivada}/aluguel`;

    registrarAluguel(Aluguel: Aluguel): Observable<Aluguel> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.post<Aluguel>(`${this.url}/create`, Aluguel, { headers });
    }

    update(id: number, Aluguel: Aluguel): Observable<Aluguel> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.put<Aluguel>(`${this.url}/update?id=${id}`, Aluguel, {
            headers,
        });
    }

    getAllAlugueis() {

        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Aluguel[]>(`${this.url}/read`, { headers });

    }
}
