import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewmeetingortrainingeventComponent } from './viewmeetingortrainingevent/viewmeetingortrainingevent.component';
import { ViewworkordersforemployeeComponent } from './viewworkordersforemployee/viewworkordersforemployee.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewmeetingortrainingeventComponent, ViewworkordersforemployeeComponent]
})
export class EmployeeModule { }
