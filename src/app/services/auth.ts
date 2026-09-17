import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  login(nome: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      nome,
      senha
    }).pipe(
      tap(() => {
        sessionStorage.setItem('usuarioLogado', 'true');
      })
    );
  }

  estaLogado(): boolean {
    return sessionStorage.getItem('usuarioLogado') === 'true';
  }

  logout(): void {
    sessionStorage.removeItem('usuarioLogado');
  }
}