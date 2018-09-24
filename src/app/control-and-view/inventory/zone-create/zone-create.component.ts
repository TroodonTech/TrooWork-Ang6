import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
@Component({
  selector: 'app-zone-create',
  templateUrl: './zone-create.component.html',
  styleUrls: ['./zone-create.component.scss']
})
export class ZoneCreateComponent implements OnInit {
  building: Inventory[];
  floorName: Inventory[];
  constructor(private inventoryService: InventoryService) { }

  addZone(FacilityKey,FloorName,ZoneName) {
    // debugger;
 
    this.inventoryService.createZones(FacilityKey,FloorName,ZoneName);
}

 selectFloorfromBuildings(facKey)
 {
  this.inventoryService
    .getallFloorList(facKey)
    .subscribe((data: Inventory[]) => {
      // debugger;
      this.floorName = data;
    });
  }

  ngOnInit() 
  {
    this.inventoryService
    .getallBuildingList()
    .subscribe((data: Inventory[]) => {
      // debugger;
      this.building = data;
    });
  

  }

}
