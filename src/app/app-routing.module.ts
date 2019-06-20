import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: './control-and-view/dashboard/login/login.module#LoginModule' // varun- first page to load for lazy loading.... 
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
