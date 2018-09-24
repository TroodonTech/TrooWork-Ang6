import { Component, OnInit,OnChanges } from '@angular/core';
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';

@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrls: ['./building-view.component.scss']
})
export class BuildingViewComponent implements OnInit {

  build: Inventory[];
  delete_faciKey: number;
  constructor(private inventoryService: InventoryService) { }
  deleteFacility(){
    
  this.inventoryService
   .DeleteBuilding(this.delete_faciKey).subscribe(res =>this.ngOnInit() );
    
}

searchFacility(SearchValue){
//  debugger;
  this.inventoryService
   .SearchBuilding(SearchValue).subscribe((data: Inventory[]) => {
    this.build = data;
    
  });
   
};


deleteFacPass(FacilityKey){
  this.delete_faciKey=FacilityKey;
}
  ngOnInit() {
   
    this.inventoryService
      .getBuildings()
      .subscribe((data: Inventory[]) => {
        this.build = data;
        
      });
  }

}
