import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-floor-edit',
  templateUrl: './floor-edit.component.html',
  styleUrls: ['./floor-edit.component.scss']
})
export class FloorEditComponent implements OnInit {
  facKey$: Object;
  floorKey$: Object;
  flooroptions: Inventory[];
  buildingList: Inventory[];
  constructor(private route: ActivatedRoute,private inventoryService: InventoryService) {
    this.route.params.subscribe(params => this.facKey$ = params.Facility_Key);
    this.route.params.subscribe(params => this.floorKey$ = params.Floor_Key);
   }

  updateFloor(FacilityKey,
    FloorKey,FloorName,FloorDescription) {
    this.inventoryService.UpdateFloor(FacilityKey,FloorKey,FloorName,FloorDescription);
  }
  ngOnInit() {
    this.inventoryService
    .getallBuildingList()
    .subscribe((data: Inventory[]) => {
      // debugger;
      this.buildingList = data;
    });
    this.inventoryService.EditFloorAutoGenerate(this.floorKey$,this.facKey$).subscribe((data: Inventory[]) => {
      this.flooroptions = data;
      debugger;
    });
  }

}
