import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoustumerService } from 'src/app/servic/coustumer-service.service';

@Component({
  selector: 'app-not-vec-customer',
  templateUrl: './not-vec-customer.component.html',
  styleUrls: ['./not-vec-customer.component.css']
})
export class NotVecCustomerComponent implements OnInit {


  constructor(public activatedRoute: ActivatedRoute, public coustumerServic: CoustumerService,private router:Router) { }
  count?:number

  ngOnInit(): void {
    this.activatedRoute.params.subscribe();
  this.howManyCustomerVacc()
  }
  howManyCustomerVacc() {
    this.coustumerServic.getCountNOTvac().subscribe(data=>{this.count = data[0]['ans']});
    
  }
  close(){
    this.router.navigate(['/customer' ]);
  }
 

}
