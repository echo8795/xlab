import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AirtableService } from '../airtable.service';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    FormsModule,
    HttpModule, 
    BrowserModule,
    DashboardRoutingModule
  ],
  providers: [AirtableService]
})
export class DashboardModule { }
