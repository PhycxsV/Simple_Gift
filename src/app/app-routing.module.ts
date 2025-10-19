import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'room-selection',
    loadChildren: () => import('./pages/room-selection/room-selection.module').then(m => m.RoomSelectionPageModule)
  },
  {
    path: 'room-dashboard',
    loadChildren: () => import('./pages/room-dashboard/room-dashboard.module').then(m => m.RoomDashboardPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxPageModule)
  },
  {
    path: 'compose',
    loadChildren: () => import('./pages/compose/compose.module').then(m => m.ComposePageModule)
  },
  {
    path: 'letter-detail',
    loadChildren: () => import('./pages/letter-detail/letter-detail.module').then(m => m.LetterDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
