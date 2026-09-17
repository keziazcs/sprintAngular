import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  nome: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) { }

  entrar(): void {
    this.mensagemErro = '';

    this.authService.login(this.nome, this.senha).subscribe({
      next: (usuario) => {
        console.log('Login realizado com sucesso:', usuario);
        this.router.navigate(['/home']);
      },

      error: () => {
        this.mensagemErro = 'Usuário ou senha inválidos.';
      }
    });
  }
}