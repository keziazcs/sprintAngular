import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./home/home-module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./dashboard/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];