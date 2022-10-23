import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoustomersComponent } from './component/coustomers/coustomers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsCustomerComponent } from './component/details-customer/details-customer.component';
import { NotVecCustomerComponent } from './component/not-vec-customer/not-vec-customer.component';
import { NewCustomerComponent } from './component/new-customer/new-customer.component';
import { AddDiseasComponent } from './component/add-diseas/add-diseas.component';
import { AddVaccinationComponent } from './component/add-vaccination/add-vaccination.component';
import { DiseaseAllMonthComponent } from './component/disease-all-month/disease-all-month.component';


@NgModule({
  declarations: [
    AppComponent,
    CoustomersComponent,
    DetailsCustomerComponent,
    NotVecCustomerComponent,
    NewCustomerComponent,
    AddDiseasComponent,
    AddVaccinationComponent,
    DiseaseAllMonthComponent,
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
