import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from './app.routes';

// Services
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
import { AddInvestmentComponent } from './components/member-area/investment/add-investment/add-investment.component';
import { SignupComponent } from './components/signup/signup.component';
import { MemberAreaComponent } from './components/member-area/member-area/member-area.component';
import { ModalAddInvestmentComponent } from './components/member-area/modals/modal-add-investment/modal-add-investment.component';
import { PatrimonyWidgetComponent } from './components/member-area/dashboard/widgets/patrimony-widget/patrimony-widget.component';

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
    WidgetHostDirective,
    AddInvestmentComponent,
    SignupComponent,
    MemberAreaComponent,
    ModalAddInvestmentComponent,
    PatrimonyWidgetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    routes,
    ModalModule.forRoot()
  ],
  providers: [
    AngularFireDatabase,
    AuthGuardService,
    InvestmentsService,
    UserService,
    BsModalService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ ModalAddInvestmentComponent ]
})
export class AppModule { }
