import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../../../model-class/Inventory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../../../service/Inventory.service';
@Component({
  selector: 'app-floor-create',
  templateUrl: './floor-create.component.html',
  styleUrls: ['./floor-create.component.scss']
})
export class FloorCreateComponent implements OnInit {

  flooroptions: Inventory[];
  floorcreate: FormGroup; constructor(private fb: FormBuilder,private inventoryService: InventoryService) {

    this. floorcreate = fb.group({
      FacilityKey: ['', Validators.required],
      FloorName: ['', Validators.required],
      FloorDescription: ['', Validators.required]
      });
  }

  // floorOptionsDd()
  // {

  // }
  addFloor(FacilityKey,FloorName,FloorDescription) {
    // debugger;
 
    this.inventoryService.createFloors(FacilityKey,FloorName,FloorDescription);
}

  ngOnInit() {
  
    this.inventoryService
    .getallBuildingList()
    .subscribe((data: Inventory[]) => {
      // debugger;
      this.flooroptions = data;
    });
  }

}
