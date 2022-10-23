import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vaccination } from 'src/app/models/vaccination';
import { CoustumerService } from 'src/app/servic/coustumer-service.service';

@Component({
  selector: 'app-add-vaccination',
  templateUrl: './add-vaccination.component.html',
  styleUrls: ['./add-vaccination.component.css']
})
export class AddVaccinationComponent implements OnInit {

  newVac :vaccination = new vaccination("",new Date(),"");
  id!:string
  constructor(public activatedRoute: ActivatedRoute, public coustumerServic: CoustumerService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(par => { this.id = par['id'] },
      err => { alert("ERROR" + err) });
  }

  addDate(event:any)
  {
    debugger
    this.newVac.vac_date=event.target.value;
    debugger
  }
  addType(event:any)
  {
    this.newVac.vac_type=event.target.value;
    debugger
  }
  close(id:string){
    this.router.navigate(['/DetailsCustomer/' + id]);
  }
  addVac() {
    debugger

    this.coustumerServic.addVac(this.newVac,this.id).subscribe(data => {
      alert( data[0]['ans'])
    },
      err => { alert("לא נוסף ") });
      debugger
      this.close(this.id)
  }

}
