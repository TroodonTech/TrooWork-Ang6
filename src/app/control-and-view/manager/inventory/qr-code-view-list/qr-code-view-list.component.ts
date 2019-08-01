import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../service/inventory.service';
import { ActivatedRoute } from "@angular/router";
import { ConectionSettings } from '../../../../service/ConnectionSetting';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

@Component({
  selector: 'app-qr-code-view-list',
  templateUrl: './qr-code-view-list.component.html',
  styleUrls: ['./qr-code-view-list.component.scss']
})
export class QrCodeViewListComponent implements OnInit {

  qrcode = [];
  QRCodeRoomKey$;
  roomdetails;
  roomdetailsnamelist = [];
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  roomdetailsname;
  QRCodeArray = [];
  checkvaluetag$;

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {
    this.route.params.subscribe(params => this.QRCodeRoomKey$ = params.QRCodeRoomKey);
    this.route.params.subscribe(params => this.checkvaluetag$ = params.checkvaluetag);
  }

  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  public captureScreen() {
    const doc = new jspdf();
    var data = document.getElementById('part1');
    html2canvas(data).then(canvas => {
      const img = canvas.toDataURL('image/png');
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.addPage();
      doc.autoTable({
        html: '#contentToConvert',
      });
      doc.save('QRCode.pdf');
    });
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    var QRCodeRoomList = this.QRCodeRoomKey$.split(",");
    var count=0;
    console.log(this.checkvaluetag$);
    for (var i = 0; i < QRCodeRoomList.length; i++) {
      this.inventoryService.getRoomDetailsList(QRCodeRoomList[i], this.OrganizationID).subscribe((data) => {
        this.roomdetails = data[0];
        if(this.checkvaluetag$=="workorderrequest"){
          this.qrcode.push({ url: ConectionSettings.AbsUrl + '/#/UserWorkRequest/' + this.roomdetails.FacilityKey + '/' + this.roomdetails.FloorKey + '/' + this.roomdetails.ZoneKey + '/' + this.roomdetails.RoomTypeKey + '/' + this.OrganizationID + '/' + this.roomdetails.RoomKey + '', RoomKey: this.roomdetails.RoomKey });
        }
        else{
          this.qrcode.push({ url: ConectionSettings.AbsUrl + '/#/Reviews/' + this.roomdetails.FacilityKey + '/' + this.roomdetails.FloorKey + '/' + this.roomdetails.ZoneKey + '/' + this.roomdetails.RoomTypeKey + '/' + this.OrganizationID + '/' + this.roomdetails.RoomKey + '', RoomKey: this.roomdetails.RoomKey });
        }
      });
      this.inventoryService.getRoomDetailsNamesList(QRCodeRoomList[i], this.OrganizationID).subscribe((data) => {
        this.roomdetailsname = data[0];
        this.roomdetailsnamelist.push(this.roomdetailsname);
        count = count + 1;
        if (count === QRCodeRoomList.length) {
          this.createQRArray();
        }
      });
    }
  }

  createQRArray() {
    this.QRCodeArray = this.roomdetailsnamelist;
    for (var k = 0; k < this.QRCodeArray.length; k++) {
      for (var j = 0; j < this.qrcode.length; j++) {

        if (this.QRCodeArray[k].RoomKey === this.qrcode[j].RoomKey) {
          this.QRCodeArray[k].url = this.qrcode[j].url;
          this.QRCodeArray[k].RoomsKey = this.qrcode[j].RoomKey;
        }
      }
    }
  }
}
