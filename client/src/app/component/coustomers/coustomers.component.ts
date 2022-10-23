import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { customer } from 'src/app/models/custumer.model';
import { customerAll } from 'src/app/models/custumerAll';
import { CoustumerService } from 'src/app/servic/coustumer-service.service';

@Component({
  selector: 'app-coustomers',
  templateUrl: './coustomers.component.html',
  styleUrls: ['./coustomers.component.css']
})

export class CoustomersComponent implements OnInit {


  // listCustomer: customer[] = []
  // customerAll!: customerAll;
  newCustomer!: customer
 
  constructor(private http: HttpClient, public coustumerServic: CoustumerService, private router: Router) { }

  ngOnInit(): void {
    debugger
    this.coustumerServic.getCustomer()
    debugger
  }
 
  // getCustomer() {
  //   // this.coustumerServic.get().subscribe(data => { this.listCustomer=data},
  //   //   err => {"ERROR"+err});
  // }
  getById(id: string) {
    // debugger
    // this.coustumerServic.getById(id).subscribe(data=>{ this.customerAll=data},
    //   err => {alert("ERROR"+err)});
    debugger
    this.router.navigate(['/DetailsCustomer/' + id]);
  }
  delelte(id: string) {
    debugger
    this.coustumerServic.DeleteCustomer(id).subscribe(res => {
      alert( res[0]['ans'])
    },
      err => { alert("לא נמחק ") });
      debugger
    this.router.navigate(['/customer' ]);
  }
  AddCustomer() {
    debugger

    this.router.navigate(['/newcustomer/']);

  }
  howManyCustomerVacc() {
    this.router.navigate(['/notveccustome/']);
    
    
  }
  howDiseaseInMonth(){
    this.router.navigate(['/DiseaseInMonth/']);
    debugger
  }
}
