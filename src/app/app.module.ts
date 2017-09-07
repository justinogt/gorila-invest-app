import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/Dashboard/dashboard-header/dashboard-header.component';
import { InvestmentsComponent } from './components/investment/investments/investments.component';
import { DetailInvestmentComponent } from './components/Investment/detail-investment/detail-investment.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SimpleWidgetComponent } from './components/dashboard/widgets/simple-widget/simple-widget.component';

// services
import { WidgetsService } from './services/widgets.service';
import { WidgetHostDirective } from './directives/widget-host.directive';

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
  ],
  imports: [
    BrowserModule
  ],
  providers: [ WidgetsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
