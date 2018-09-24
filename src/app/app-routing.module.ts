import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './control-and-view/dashboard/login/login.component';
import { WelcomepageComponent } from './control-and-view/dashboard/welcomepage/welcomepage.component';
import { ManagerDashBoardComponent } from './control-and-view/dashboard/manager-dash-board/manager-dash-board.component';

import { BuildingViewComponent } from './control-and-view/inventory/building-view/building-view.component';
import { CreatebuildingComponent } from './control-and-view/inventory/createbuilding/createbuilding.component';
import { BuildingEditComponent } from './control-and-view/inventory/building-edit/building-edit.component';

import { CreateEmployeeComponent } from './control-and-view/people/create-employee/create-employee.component';

import { FloorViewComponent } from './control-and-view/inventory/floor-view/floor-view.component';
import { FloorCreateComponent } from './control-and-view/inventory/floor-create/floor-create.component';
import { FloorEditComponent } from './control-and-view/inventory/floor-edit/floor-edit.component';

import { ManageLoginCredentialsComponent } from './control-and-view/people/manage-login-credentials/manage-login-credentials.component';
import { ResetPassWordComponent } from './control-and-view/people/reset-pass-word/reset-pass-word.component';

import { ZoneViewComponent } from './control-and-view/inventory/zone-view/zone-view.component';
import { ZoneEditComponent } from './control-and-view/inventory/zone-edit/zone-edit.component';
import { ZoneCreateComponent } from './control-and-view/inventory/zone-create/zone-create.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'welcomePage',
    component: WelcomepageComponent
  },
  {
    path: 'Buildview',
    component: BuildingViewComponent
  },
  {
    path: 'Createbuilding',
    component: CreatebuildingComponent
  },
  {
    path: 'Buildedit/:Facility_Key',
    component: BuildingEditComponent
  },
  {
    path: 'addEmployee',
    component: CreateEmployeeComponent
  },
  {

    path: 'Floorview',
    component: FloorViewComponent
  },
  {
    path: 'Createfloor',
    component: FloorCreateComponent
  },
  {
    path: 'Flooredit/:Floor_Key/:Facility_Key',
    component: FloorEditComponent
  },
  {
    path: 'manageLoginCredentials',
    component: ManageLoginCredentialsComponent
  },
  {
    path: 'resetPassword/:EmpKey',
    component: ResetPassWordComponent
  },
  {
    path: 'Zoneview',
    component: ZoneViewComponent
  },
  {
    path: 'Zonedit',
    component: ZoneEditComponent
  },
  {
    path: 'Createzone',
    component: ZoneCreateComponent
  }

];


@NgModule({
  imports: [
    CommonModule, RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
