import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { customer } from 'src/app/models/custumer.model';
import { customerAll } from 'src/app/models/custumerAll';
import { disease } from 'src/app/models/disease';
import { vaccination } from 'src/app/models/vaccination';
import { CoustumerService } from 'src/app/servic/coustumer-service.service';

@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit {

  id: string = ""
  customerAll: customerAll = new customerAll()
  newCustomer!:customer

 

  constructor(public activatedRoute: ActivatedRoute, public coustumerServic: CoustumerService,private router:Router) { }

  ngOnInit(): void {
    debugger
    this.activatedRoute.params.subscribe(par => { this.id = par['id'] },
      err => { alert("ERROR" + err) });
    this.getById(this.id)
  }

  getById(id: string) {

    debugger
    this.customerAll.customer = this.coustumerServic.listCustomer.find(c => c.id === id)
    this.coustumerServic.getDisById(id).subscribe( data => {
      // alert(data)
 
      this.customerAll.diease = data
      debugger
    });
    delay(1000)
    this.coustumerServic.getVecById(id).subscribe(data => {
      // alert(data)
      this.customerAll.vecAll = data
      debugger
    });
    delay(1000)

  }

  close(){
    this.router.navigate(['/customer' ]);
  }

  UpdateCustomer(newCustomerALL: customerAll) {
    
    debugger
    if (newCustomerALL.vecAll.length !=0)
    {
      newCustomerALL.vecAll.forEach(element => {
        setTimeout(() => {this.coustumerServic.updateVaction(element,newCustomerALL.customer?.id).subscribe()}, 1000);
      });
    }
   
    if (newCustomerALL.diease.length!=0)
    {
      this.coustumerServic.updateDisease(newCustomerALL.diease[0],newCustomerALL.customer?.id).subscribe();
    }
    debugger
    this.coustumerServic.UpdateCustomer(newCustomerALL.customer!).subscribe(res => {
      alert(res[0]['ans'])
    },
      err => { alert(err[0]['ans']) });

    this.router.navigate(['/customer' ]);
    debugger

  }

  changeName(event:any)
  {
    debugger
    this.customerAll.customer!.name_coustumer=event.target.value;
    debugger
  }
  changeAdress(event:any)
  {
    debugger
    this.customerAll.customer!.adrress=event.target.value;
    debugger
  }
  changeBirthDay(event:any)
  {
    debugger
    this.customerAll.customer!.Date_of_birth=event.target.value;
    debugger
  }
  changeNumber(event:any)
  {
    debugger
    this.customerAll.customer!.name_coustumer=event.target.value;
    debugger
  }
  changeMobile(event:any)
  {
    debugger
    this.customerAll.customer!.mobile_number=event.target.value;
    debugger
  }
  changeVacDate(event:any, id:string)
  {
    debugger
    this.customerAll.vecAll.find(c=> c.id_vac=id)!.vac_date=event.target.value;
    debugger
  }
  changeVacType(event:any, id:string)
  {
    this.customerAll.vecAll.find(c=> c.id_vac=id)!.vac_type=event.target.value;
  }
  changeSick_date(event:any)
  {
    this.customerAll.diease[0].sick_date=event.target.value;
  }
  changeRecovercy_date(event:any)
  {
    this.customerAll.diease[0].recovercy_date=event.target.value;
  }
 
  
  addDiseas( id?: string)
  {
   
    this.router.navigate(['/AddDiseas/' + id]);

      
  }
  addVaccinate( id?: string)
  {
   
    this.router.navigate(['/AddVac/' + id]);

      
  }
  // 
  url: any; 
	msg = "";
	
	
	selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.customerAll.customer!.picture = reader.result; 
      this.coustumerServic.updatetPicture(this.url,this.customerAll.customer?.id).subscribe();
      
		}
  }
}