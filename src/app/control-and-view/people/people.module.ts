import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { JobTitleViewComponent } from './job-title-view/job-title-view.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateEmployeeComponent, JobTitleViewComponent]
})
export class PeopleModule { }
