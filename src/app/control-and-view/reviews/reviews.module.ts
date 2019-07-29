import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDatepickerModule} from 'ng2-datepicker';

import { ReviewsComponent } from "./reviews.component";

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    NgDatepickerModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewsComponent]
})
export class ReviewsModule { }
