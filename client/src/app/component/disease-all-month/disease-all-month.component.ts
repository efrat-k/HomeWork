import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { disease } from 'src/app/models/disease';
import { sumSick } from 'src/app/models/sumSick';
import { CoustumerService } from 'src/app/servic/coustumer-service.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-disease-all-month',
  templateUrl: './disease-all-month.component.html',
  styleUrls: ['./disease-all-month.component.css']
})
export class DiseaseAllMonthComponent implements OnInit {
  month: string =""
  listSickInMonth: sumSick[]=[];
  
  constructor(public activatedRoute: ActivatedRoute, public coustumerServic: CoustumerService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe();
  }
  changedate(event:any){
    this.month =event.target.value;
  }
  showDiseasInMonth()
  {
    // this.coustumerServic.getSickInMonth(this.month).subscribe((data: sumSick[])=>{this.listSickInMonth=data});
    // debugger
    this.coustumerServic.showDiseasInMonth(this.month)
  }
   close(){
    this.coustumerServic.listSickInMonth=[]
    this.router.navigate(['/customer' ]);

  }
  
}
