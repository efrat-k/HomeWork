import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { CoustumerService } from "./servic/coustumer-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  // listCusromer:customer[]=[]
  constructor(private coustumerServic: CoustumerService, private router :Router) { }
  ngOnInit() {
    
  }
  // getCustomer(){
  //   debugger
  //   this.coustumerServic.getAllCustomer().subscribe(l=>{this.listCusromer=l},err=>{alert("ERROR"+err)});
  // }

}