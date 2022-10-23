import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { disease } from 'src/app/models/disease';
import { CoustumerService } from 'src/app/servic/coustumer-service.service';

@Component({
  selector: 'app-add-diseas',
  templateUrl: './add-diseas.component.html',
  styleUrls: ['./add-diseas.component.css']
})
export class AddDiseasComponent implements OnInit {
  newSick :disease = new disease("","")
  id!:string
  constructor(public activatedRoute: ActivatedRoute, public coustumerServic: CoustumerService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(par => { this.id = par['id'] },
      err => { alert("ERROR" + err) });
  }

  addSick_date(event:any)
  {
    debugger
    this.newSick.sick_date=event.target.value;
    debugger
  }
  addRecovercy_date(event:any)
  {
    this.newSick.recovercy_date=event.target.value;
    debugger
  }
  close(id:string){
    this.router.navigate(['/DetailsCustomer/' + id]);
  }
  addDiseas() {
    debugger

    this.coustumerServic.addDiseas(this.newSick,this.id).subscribe(data => {
      alert( data[0]['ans'])
    },
      err => { alert("לא נוסף " ) });
      debugger
      this.close(this.id)
  }
}



