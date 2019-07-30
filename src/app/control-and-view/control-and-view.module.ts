import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserWorkRequestComponent } from './user-work-request/user-work-request.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReviewsComponent, UserWorkRequestComponent]
})
export class ControlAndViewModule { }
