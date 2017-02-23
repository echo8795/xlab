import { AuthGuardService	} from '../auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const appRoutes: Routes = [
  { 
  	path: 'dashboard', 
  	component: DashboardComponent,
  	canActivate : [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class DashboardRoutingModule {}
