import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import {  EmployeeChangePasswordModule } from '../../user-password-changes/employee-change-password/employee-change-password.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
 const routes: Routes = [
  {
    path: 'EmployeeDashboard',
    component: EmployeeDashboardComponent,// varun - EmployeeDashboard as parent component
    children: [ // varun- child components
      {
        path: 'Emp_welcomePage',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-welcome-pages/employee-welcome/employee-welcome.module#EmployeeWelcomeModule',

      },
      {
        path: 'Viewmeetingortrainingevent',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/viewmeetingortrainingevent/viewmeetingortrainingevent.module#ViewmeetingortrainingeventModule',

      },
      {
        path: 'Viewworkordersforemployee',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/viewworkordersforemployee/viewworkordersforemployee.module#ViewworkordersforemployeeModule',

      },
      {
        path: 'employeeMyProfile',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-profiles/employee-profile/employee-profile.module#EmployeeProfileModule',

      },
      {
        path: 'employeeMyProfile/changePasswordEmployee/:EmployeeKey/:UserRoleName/:IsSupervisor',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-password-changes/employee-change-password/employee-change-password.module#EmployeeChangePasswordModule',

      },
      {
        path: 'changePasswordEmployee/:EmployeeKey/:UserRoleName/:IsSupervisor',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-password-changes/employee-change-password/employee-change-password.module#EmployeeChangePasswordModule',

      },
     ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ],
  declarations: [EmployeeDashboardComponent],
  exports: [EmployeeDashboardComponent]

})
export class EmployeeDashbordModule { }
