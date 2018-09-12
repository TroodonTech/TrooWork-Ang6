import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getBuildings() {
    return this
      .http
      .get('http://localhost:3000/api/allfacilityByPageNo?pageno='+ 1 +'&itemsperpage='+250+'&employeekey='+2861+'&OrganizationID='+21);
  }
  EditFacility(facKey) {
    return this
      .http
      .get('http://localhost:3000/api/getfacilityById?facKey=' + facKey+'&OrganizationID='+21);

  }
  UpdateBuilding(FacilityName, FacilityKey) {
    // debugger;
    return this
      .http
      .get('http://localhost:3000/api/updateFacility?facility_key=' + FacilityKey + '&facility_name=' + FacilityName + '&employeekey=' + 2861 + '&OrganizationID=' + 21)
      .subscribe(res => console.log('Done'));
  }
  DeleteBuilding(facility_key){
    // debugger;
    return this
      .http
      .get('http://localhost:3000/api/deleteFacility?facility_key='+facility_key+'&employeekey='+2861+'&OrganizationID='+21)
      
  }
  SearchBuilding(SearchFacility){
    return this
      .http
      .get('http://localhost:3000/api/searchBuildingList?OrganizationID='+21+'&searchFacility=' +SearchFacility)
      
      
  }
   getFloors() {
    return this
      .http
      .get('http://localhost:3000/api/getAllfacility_floor?pagenumber='+1+'&itemsPerPage='+25+'&employeekey='+2861+'&OrganizationID='+21);
  }
 
  createFloors(FacilityKey,FloorName,FloorDescription) {
    debugger;
    return this
      .http
      .get('http://localhost:3000/api/addnewfloor?FacilityKey='+FacilityKey+'&FloorDescription='+FloorDescription+'&FloorName='+FloorName+'&OrganizationID='+21+'&employeekey='+2861)   
      .subscribe(res => console.log('Done'));
    }

      getallBuildingList(){
        return this
        .http
        .get('http://localhost:3000/api/allfacility?empkey='+2861+'&OrganizationID='+21);
      }
}
