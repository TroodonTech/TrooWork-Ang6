import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { JobTitleViewComponent } from './job-title-view/job-title-view.component';
import { ManageLoginCredentialsComponent } from './manage-login-credentials/manage-login-credentials.component';
import { ResetPassWordComponent } from './reset-pass-word/reset-pass-word.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateEmployeeComponent, JobTitleViewComponent, ManageLoginCredentialsComponent, ResetPassWordComponent]
})
export class PeopleModule { }
