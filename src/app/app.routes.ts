import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MemberAreaComponent } from './components/member-area/member-area.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { InvestmentsComponent } from './components/investment/investments/investments.component';

import { AuthGuardService } from './services/auth-guard.service';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'member-area',
    component: MemberAreaComponent,
    canActivate: [ AuthGuardService ],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'investimentos', component: InvestmentsComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
