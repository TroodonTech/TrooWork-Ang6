import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerDashBoardModule } from '../../../dashboard/user-dashboards/manager-dash-board/manager-dash-board.module';
import { Routes, RouterModule } from '@angular/router';
import { ViewshiftComponent } from './viewshift.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
const routes: Routes = [
  {
    path: '',
    component: ViewshiftComponent
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    ManagerDashBoardModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule
  ],
  declarations: [ViewshiftComponent]
})
export class ViewshiftModule { }
