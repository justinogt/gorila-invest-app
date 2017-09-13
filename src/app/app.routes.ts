import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MemberAreaComponent } from './components/member-area/member-area/member-area.component';
import { InvestmentsComponent } from './components/member-area/investment/investments/investments.component';
import { DetailInvestmentComponent } from './components/member-area/Investment/detail-investment/detail-investment.component';

import { AuthGuardService } from './services/auth-guard.service';

export const router: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'member-area',
    component: MemberAreaComponent,
    canActivate: [ AuthGuardService ],
    children: [
      { path: 'investimentos/detail/:id', component: DetailInvestmentComponent },
      { path: 'investimentos', component: InvestmentsComponent },
      { path: '', redirectTo: 'investimentos', pathMatch: 'full' },
      { path: '**', redirectTo: 'investimentos' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
