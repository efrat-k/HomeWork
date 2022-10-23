import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDiseasComponent } from './component/add-diseas/add-diseas.component';
import { AddVaccinationComponent } from './component/add-vaccination/add-vaccination.component';
import { CoustomersComponent } from './component/coustomers/coustomers.component';
import { DetailsCustomerComponent } from './component/details-customer/details-customer.component';
import { DiseaseAllMonthComponent } from './component/disease-all-month/disease-all-month.component';
import { NewCustomerComponent } from './component/new-customer/new-customer.component';
import { NotVecCustomerComponent } from './component/not-vec-customer/not-vec-customer.component';

import { customer } from './models/custumer.model';

const routes: Routes = [
  // {path: 'longin', component: CoustomersComponent},
  {path: '', component:CoustomersComponent},
  {path: 'DetailsCustomer/:id', component: DetailsCustomerComponent},
  {path: 'customer', component:CoustomersComponent},
  {path: 'notveccustome', component: NotVecCustomerComponent},
  {path: 'newcustomer', component: NewCustomerComponent},
  {path: 'AddDiseas/:id', component: AddDiseasComponent},
  {path: 'AddVac/:id', component: AddVaccinationComponent},
  {path: 'DiseaseInMonth', component: DiseaseAllMonthComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
