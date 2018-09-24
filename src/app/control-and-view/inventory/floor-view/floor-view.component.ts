import { Component, OnInit, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-floor-view',
  templateUrl: './floor-view.component.html',
  styleUrls: ['./floor-view.component.scss']
})
export class FloorViewComponent implements OnInit {
  floor: Inventory[];
  delete_faciKey: number;
  delete_floorKey: number;
  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_]*$';
  @Input() isAlphaNumeric: boolean;
  constructor(private formBuilder: FormBuilder, private inventoryService: InventoryService, private el: ElementRef) { }
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }
  deleteFloor() {
    this.inventoryService
      .DeleteFloor(this.delete_faciKey, this.delete_floorKey).subscribe(res => this.ngOnInit());

  }
  deleteFloorPass(FacilityKey, FloorKey) {
    this.delete_faciKey = FacilityKey;
    this.delete_floorKey = FloorKey;
  }

  searchFloor(SearchValue) {
    //  debugger;
    if (SearchValue.length >= 3) {
      this.inventoryService
        .SearchFloor(SearchValue).subscribe((data: Inventory[]) => {
          this.floor = data;

        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getFloors()
        .subscribe((data: Inventory[]) => {
          this.floor = data;
        });
    }
  };

  ngOnInit() {
    // debugger;
    this.inventoryService
      .getFloors()
      .subscribe((data: Inventory[]) => {
        this.floor = data;
      });
    this.searchform = this.formBuilder.group({
      SearchFloor: ['', Validators.required]
    });
  }

}
