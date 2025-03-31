import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import("./features/home/pages/home/home.component").then(m => m.HomeComponent),
  },
  {
    path: 'tournament',
    loadComponent: () =>
      import("./features/tournament/pages/tournament-index/tournament-index.component").then(m => m.TournamentIndexComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/pages/profile-update/profile-update.component').then(m => m.ProfileUpdateComponent),
  },
  {
    path: 'stats',
    loadComponent: () => import('./features/profile/pages/profile-stats/profile-stats.component').then(m => m.ProfileStatsComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent),
  },
];
