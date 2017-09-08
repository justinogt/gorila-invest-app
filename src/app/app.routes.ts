import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MemberAreaComponent } from './components/member-area/member-area.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuardService } from './services/auth-guard.service';

export const router: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'member-area', component: MemberAreaComponent, canActivate: [ AuthGuardService ] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
