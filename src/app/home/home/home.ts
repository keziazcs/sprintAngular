import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  menuAberto: boolean = false;

  constructor(
    private router: Router,
    private authService: Auth
  ) { }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  acessarDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}