import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../service/review.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  
  comments;
  OrgId$;
  rKey$;
  reviewAdd;
  starList: boolean[] = [true,true,true,true,true];   
  rating:number;  

  
  setStar(data:any){
        this.rating=data+1;                               
        for(var i=0;i<=4;i++){  
          if(i<=data){  
            this.starList[i]=false;  
          }  
          else{  
            this.starList[i]=true;  
          }  
       }  
   }  

   convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  }; 

  constructor(private reviewservice: ReviewService,private router: Router,private route: ActivatedRoute) 
  {
    this.route.params.subscribe(params => this.OrgId$ = params.rev_orgid);
    this.route.params.subscribe(params => this.rKey$ = params.room_key);
   }
  SubmitReview()
  {
    var t=new Date();
    var t=new Date();
    var y=t.getFullYear();
    var m=t.getMonth();
    var d=t.getDate();
    var h=t.getHours();
    var mi=t.getMinutes();
    var s=t.getSeconds();
    var today_DT = this.convert_DT(new Date());
    var p="";
    p=today_DT+" "+h+":"+mi+":"+s;
    this.reviewAdd= {
     Orgid : this.OrgId$,
     roomKey : this.rKey$,
     starValue : this.rating,
     Comments : this.comments,
     feedback_time : p
    };
    this.reviewservice.submitReview(this.reviewAdd).subscribe((data: any[]) => {
      alert('Thank you for your valuable feedback !');
    });
  }
  ngOnInit() {
  }

}
