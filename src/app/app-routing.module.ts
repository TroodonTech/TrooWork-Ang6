import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserWorkRequestModule } from './control-and-view/user-work-request/user-work-request.module';

const routes: Routes = [

  {
    path: '',
    loadChildren: './control-and-view/dashboard/login/login.module#LoginModule' // varun- first page to load for lazy loading.... 
  },
  {
    path: 'Reviews/:room_key/:rev_orgid',// user review page
    loadChildren: './control-and-view/reviews/reviews.module#ReviewsModule' 
  },
  {
    path: 'UserWorkRequest/:Facility_Key/:Floor_Key/:Zone_Key/:rev_orgid/:room_key',// user request page
    loadChildren: './control-and-view/user-work-request/user-work-request.module#UserWorkRequestModule' 
  },
];


@NgModule({
  imports: [
    CommonModule, RouterModule,
    RouterModule.forRoot(routes,{
      // Tell the router to use the HashLocationStrategy.
      useHash: true
  })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
