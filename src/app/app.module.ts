import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { BuildingViewComponent } from './building-view/building-view.component';
import { ManagerDashBoardComponent } from './manager-dash-board/manager-dash-board.component';
import { CreatebuildingComponent } from './createbuilding/createbuilding.component';
import {CreatebuildingService} from './createbuilding.service';
import { BuildingEditComponent } from './building-edit/building-edit.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

import { CreateEmployeeComponent } from './control-and-view/people/create-employee/create-employee.component';
import { FloorViewComponent } from './floor-view/floor-view.component';
import { FloorCreateComponent } from './floor-create/floor-create.component';
import { FloorEditComponent } from './floor-edit/floor-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    LoginComponent,
    BuildingViewComponent,
    ManagerDashBoardComponent,
    CreatebuildingComponent,
    BuildingEditComponent,
    WelcomepageComponent,
    CreateEmployeeComponent,
     FloorViewComponent,
    FloorCreateComponent,
    FloorEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ CreatebuildingComponent, CreatebuildingService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
