import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { entorno } from '../enviroment/enviroment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { AuthResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) { }

  private url: string = `${entorno.urlPrivada}/usuario`;
  private urlPublica: string = `${entorno.urlPublica}`;

  allUsersData(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(`${this.url}/allUsersData?est=${est}`, {
      headers,
    });
  }

  getUsersByRol(id: number,est:number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(`${this.url}/getUsersByRol?id=${id}&est=${est}`, {
      headers,
    });
  }

  getJefesByRolId(id: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(`${this.url}/getJefesByRolId?id=${id}`, {
      headers,
    });
  }

  searchUsersData(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(
      `${this.url}/searchUsersData?search=${search}&est=${est}`,
      { headers }
    );
  }

  searchUsersCI(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(
      `${this.url}/searchUsersCI?search=${search}&est=${est}`,
      { headers }
    );
  }

  searchUsersId(id: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario>(`${this.url}/searchUserId?id=${id}`, {
      headers,
    });
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Usuario>(`${this.url}/register`, usuario, {
      headers,
    });
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Usuario>(`${this.url}/update?id=${id}`, usuario, {
      headers,
    });
  }

  updateEst(id: number, est: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateEst?id=${id}&est=${est}`,
      null,
      { headers }
    );
  }

  senhaDono(senha: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    return this.http.get<boolean>(`${this.url}/senhaDono?senha=${senha}`, { headers });
  }

  updateSaldo(id: number, saldo: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateSaldo?id=${id}&saldo=${saldo}`,
      null,
      { headers }
    );
  }

  logIn(login: LoginRequest): Observable<AuthResponse> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<AuthResponse>(`${this.urlPublica}/login`, login, {
      headers,
    });
  }

  usuarioValido(user: string) {
    const headers = new HttpHeaders({});

    return this.http.get<boolean>(
      `${this.urlPublica}/usuarioValido?user=${user}`,
      { headers }
    );
  }

  getCantidadUsuarios() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    return this.http.get<number>(`${this.url}/cantidadUsuarios`, {
      headers,
    });
  }

  usuarioUnico(user: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    return this.http.get<boolean>(`${this.url}/usuarioUnico?user=${user}`, {
      headers,
    });
  }
}
