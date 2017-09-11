import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { routes } from './app.routes';

// Services
import { WidgetsService } from './services/widgets.service';
import { AuthGuardService } from './services/auth-guard.service';
import { InvestmentsService } from './services/investments.service';
import { UserService } from './services/user.service';

// Directives
import { WidgetHostDirective } from './directives/widget-host.directive';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/member-area/dashboard/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/member-area/Dashboard/dashboard-header/dashboard-header.component';
import { InvestmentsComponent } from './components/member-area/investment/investments/investments.component';
import { DetailInvestmentComponent } from './components/member-area/Investment/detail-investment/detail-investment.component';
import { SidebarComponent } from './components/member-area/sidebar/sidebar.component';
import { SimpleWidgetComponent } from './components/member-area/dashboard/widgets/simple-widget/simple-widget.component';
import { AddInvestmentComponent } from './components/member-area/investment/add-investment/add-investment.component';
import { SignupComponent } from './components/signup/signup.component';
import { MemberAreaComponent } from './components/member-area/member-area/member-area.component';

export const firebaseConfig = {
   apiKey: "AIzaSyBIfhHy1faBpRknRJWq-DsE0pYVTZE8sy4",
   authDomain: "gorilainvestapp.firebaseapp.com",
   databaseURL: "https://gorilainvestapp.firebaseio.com",
   projectId: "gorilainvestapp",
   storageBucket: "gorilainvestapp.appspot.com",
   messagingSenderId: "577061630249"
 };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    InvestmentsComponent,
    DetailInvestmentComponent,
    SidebarComponent,
    SimpleWidgetComponent,
    WidgetHostDirective,
    AddInvestmentComponent,
    SignupComponent,
    MemberAreaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    routes
  ],
  providers: [
    AngularFireDatabase,
    AuthGuardService,
    InvestmentsService,
    WidgetsService,
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
