import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpiringAssignmentsDetailsComponent } from './expiring-assignments-details/expiring-assignments-details.component';
import { ExpiredAssignmentsDetailsComponent } from './expired-assignments-details/expired-assignments-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExpiringAssignmentsDetailsComponent, ExpiredAssignmentsDetailsComponent]
})
export class ManagerDashboardPagesModule { }
