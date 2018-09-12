import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../Inventory.service';
import { Inventory } from '../Inventory';
@Component({
  selector: 'app-floor-view',
  templateUrl: './floor-view.component.html',
  styleUrls: ['./floor-view.component.scss']
})
export class FloorViewComponent implements OnInit {
  floor: Inventory[];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.inventoryService
    .getFloors()
    .subscribe((data: Inventory[]) => {
      this.floor = data;
      
    });
  }

}
