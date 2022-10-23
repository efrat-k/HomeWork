import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { customer } from 'src/app/models/custumer.model';
import { CoustumerService } from 'src/app/servic/coustumer-service.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
newCustomer : customer= new customer('000000000',"","","","","","")
  constructor(public activatedRoute: ActivatedRoute, public coustumerServic: CoustumerService,private router:Router) { }

  ngOnInit(): void {
  }
  changeId(event:any)
  {
    
    this.newCustomer!.id=event.target.value;
    debugger
  }
  changeName(event:any)
  {
    debugger
    this.newCustomer!.name_coustumer=event.target.value;
    debugger
  }
  changeAdress(event:any)
  {
    debugger
    this.newCustomer!.adrress=event.target.value;
    debugger
  }
  changeBirthDay(event:any)
  {
    debugger
    this.newCustomer!.Date_of_birth=event.target.value;
    debugger
  }
  changeNumber(event:any)
  {
    debugger
    this.newCustomer!.phone_number=event.target.value;
    debugger
  }
  changeMobile(event:any)
  {
    debugger
    this.newCustomer!.mobile_number=event.target.value;
    debugger
  }
  close(){
    this.router.navigate(['/customer' ]);
  }
  AddCustomer() {
    debugger

    this.coustumerServic.AddCustomer(this.newCustomer!).subscribe(data => {
      alert( data)
    },
      err => { alert("לא נוסף ") });
      debugger
      this.close()
  }
}
