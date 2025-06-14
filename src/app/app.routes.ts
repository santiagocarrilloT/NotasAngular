import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then((m) => m.MainPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'task',
    loadComponent: () =>
      import('./pages/task/task.component').then((m) => m.TaskComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'task/:id',
    loadComponent: () =>
      import('./pages/task/task.component').then((m) => m.TaskComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.page').then((m) => m.SearchPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    redirectTo: '/main',
    pathMatch: 'full',
  },
];
