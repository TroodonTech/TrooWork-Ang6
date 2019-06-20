import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { JobTitleViewComponent } from './job-title-view/job-title-view.component';
import { ManageLoginCredentialsComponent } from './manage-login-credentials/manage-login-credentials.component';
import { ResetPassWordComponent } from './reset-pass-word/reset-pass-word.component';
import { MeetingTrainingCreateComponent } from './meeting-training-create/meeting-training-create.component';
import { MeetingTrainingEditComponent } from './meeting-training-edit/meeting-training-edit.component';
import { MeetingTrainingViewComponent } from './meeting-training-view/meeting-training-view.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventViewComponent } from './event-view/event-view.component';
import { ViewEmployeesofEventComponent } from './view-employeesof-event/view-employeesof-event.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EditEmployeedetailsComponent } from './edit-employeedetails/edit-employeedetails.component';
import { SettingusernameandpswrdaftremplcreatebymanComponent } from './settingusernameandpswrdaftremplcreatebyman/settingusernameandpswrdaftremplcreatebyman.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateEmployeeComponent, 
    JobTitleViewComponent, 
    ManageLoginCredentialsComponent, 
    ResetPassWordComponent, 
    MeetingTrainingCreateComponent, 
    MeetingTrainingEditComponent, 
    MeetingTrainingViewComponent, 
    EventEditComponent, 
    EventViewComponent, 
    ViewEmployeesofEventComponent, ViewEmployeeComponent, EditEmployeedetailsComponent, SettingusernameandpswrdaftremplcreatebymanComponent]
})
export class PeopleModule { }
