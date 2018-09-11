import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CreatebuildingService} from '../createbuilding.service';
import { Inventory } from '../Inventory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-createbuilding',
  templateUrl: './createbuilding.component.html',
  styleUrls: ['./createbuilding.component.scss']
})
export class CreatebuildingComponent implements OnInit {

  
  createbuilding: FormGroup; constructor(private fb: FormBuilder,private CreatebuildingService: CreatebuildingService) {

    this.createbuilding = fb.group({
      newbuildingName: ['', Validators.required]
      });
  }
  

  addBuilding(newbuildingName) {
    debugger;
 
    this.CreatebuildingService.createBuildings(newbuildingName);
}

                
  ngOnInit() {

    
  }

}
