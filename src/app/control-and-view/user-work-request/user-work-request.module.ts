import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDatepickerModule} from 'ng2-datepicker';

import { UserWorkRequestComponent } from "./user-work-request.component";

const routes: Routes = [
  {
    path: '',
    component: UserWorkRequestComponent
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
  declarations: [UserWorkRequestComponent]
})
export class UserWorkRequestModule { }
