import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBatchWorkComponent } from './create-batch-work/create-batch-work.component';
import { SchedulingViewComponent } from './scheduling-view/scheduling-view.component';
import { EditBatchWorkComponent } from './edit-batch-work/edit-batch-work.component';
import { CreateBatchScheduleComponent } from './create-batch-schedule/create-batch-schedule.component';
import { BatchScheduleRoomComponent } from './batch-schedule-room/batch-schedule-room.component';
import { EditAssignmentScheduleForReportComponent } from './edit-assignment-schedule-for-report/edit-assignment-schedule-for-report.component';
import { ViewEmployeesofGroupComponent } from './view-employeesof-group/view-employeesof-group.component';
// import { ViewshiftComponent } from './viewshift/viewshift.component';
// import { EditshiftComponent } from './editshift/editshift.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateBatchWorkComponent, SchedulingViewComponent, EditBatchWorkComponent, CreateBatchScheduleComponent, BatchScheduleRoomComponent,
     EditAssignmentScheduleForReportComponent,
     ViewEmployeesofGroupComponent, 
    //  ViewshiftComponent, EditshiftComponent
    ]
})
export class SchedulingModule { }
