import { Component, OnInit, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { InventoryService } from '../../../service/Inventory.service';
import { Inventory } from '../../../model-class/Inventory';
@Component({
  selector: 'app-zone-view',
  templateUrl: './zone-view.component.html',
  styleUrls: ['./zone-view.component.scss']
})
export class ZoneViewComponent implements OnInit {
  zone: Inventory[];
  searchform: FormGroup;
  //validation starts ..... @rodney
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
  //validation ends ..... @rodney

  searchZone(SearchValue) {
    //  debugger;
    if (SearchValue.length >= 3) {
      this.inventoryService
        .searchZone(SearchValue).subscribe((data: Inventory[]) => {
          this.zone = data;

        });
    } else if (SearchValue.length == 0) {
      this.inventoryService
        .getZones()
        .subscribe((data: Inventory[]) => {
          this.zone = data;
        });
    }
  };

  ngOnInit() {
    // debugger;
    this.inventoryService
      .getZones()
      .subscribe((data: Inventory[]) => {
        this.zone = data;
        debugger;
      });

    this.searchform = this.formBuilder.group({
      SearchZone: ['', Validators.required]
    });
  }
}
