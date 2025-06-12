import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then((m) => m.MainPage),
  },
  {
    path: 'task',
    loadComponent: () =>
      import('./pages/task/task.component').then((m) => m.TaskComponent),
  },
  {
    path: 'task/:id',
    loadComponent: () =>
      import('./pages/task/task.component').then((m) => m.TaskComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.page').then((m) => m.SearchPage),
  },
];
