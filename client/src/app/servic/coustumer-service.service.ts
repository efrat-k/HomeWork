import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { customer } from '../component/coustomers/coustomers.component';
import { API_URL } from '../env';
import { customer } from '../models/custumer.model';
import { disease } from '../models/disease';
import { sumSick } from '../models/sumSick';
import { vaccination } from '../models/vaccination';


@Injectable({
  providedIn: 'root'
})
export class CoustumerService {

  listCustomer: customer[] = []
  listVac:vaccination[]=[]
  listSickInMonth: sumSick[]=[]
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(`${API_URL}/`);
    debugger
  }
  getCustomer() {
    this.get().subscribe(data => {console.log(data); this.listCustomer = data },
      err => { "ERROR" + err });
     
  }
  
  getDisById(id: string): Observable<any> {
    debugger
    return this.http.get<any>(`${API_URL}/getDisSpecific?id=${id}`)
  }
  getVecById(id: string): Observable<any> {
    debugger
    return this.http.get<any>(`${API_URL}/getVacSpecific?id=${id}`)
  }
  DeleteCustomer(id:string):Observable<any>{
    debugger
    return this.http.delete<any>(`${API_URL}/deleteCustomer?id=${id}`);
  }
 
  
  AddCustomer(newCustomer:customer){
    debugger
    return this.http.put<any>(`${API_URL}/insertCustomer?id=${newCustomer.id}&name_coustumer=${newCustomer.name_coustumer}&adrress=${newCustomer.adrress}&Date_of_birth=${newCustomer.Date_of_birth}&phone_number=${newCustomer.phone_number}&mobile_number=${newCustomer.mobile_number}`,newCustomer);
  }
  addDiseas(newDiesas:disease, id:string){
    debugger
    return this.http.put<any>(`${API_URL}/insertDisease?id=${id}&sick_date=${newDiesas.sick_date}&recovercy_date=${newDiesas.recovercy_date}`,newDiesas);
  }
  addVac(newVac:vaccination, id:string){
    debugger
    return this.http.put<any>(`${API_URL}/insertVaccination?id=${id}&vac_date=${newVac.vac_date}&vac_type=${newVac.vac_type}`,newVac);
  }
  UpdateCustomer(newCustomer:customer){
    debugger
    return this.http.post<any>(`${API_URL}/updateCoustumer?id=${newCustomer.id}&name_coustumer=${newCustomer.name_coustumer}&adrress=${newCustomer.adrress}&Date_of_birth=${newCustomer.Date_of_birth}&phone_number=${newCustomer.phone_number}&mobile_number=${newCustomer.mobile_number}`,newCustomer);
  }
  updateVaction(newVAR:vaccination, id?:string){
    debugger
    return this.http.post<any>(`${API_URL}/updateVaction?id_vac=${newVAR.id_vac}&id=${id}&vac_date=${newVAR.vac_date}&vac_type=${newVAR.vac_type}`,newVAR);
  }
  updateDisease(newDis:disease,id?:string){
    debugger
    return this.http.post<any>(`${API_URL}/updateDisease?id=${id}&sick_date=${newDis.sick_date}&recovercy_date=${newDis.recovercy_date}`,newDis);
  }
  updatetPicture(url:any,id?:string){
    debugger
    return this.http.post<any>(`${API_URL}/updatetPicture?id=${id}&urlPic=${url}`,url);
  }
  getCountNOTvac():Observable<any>{
    return this.http.get<any>(`${API_URL}/getCountNOTvac`)
  }
  getSickInMonth(month:string):any
  {
    return this.http.get<any>(`${API_URL}/getDisMonth?month=${month}`)
    debugger
  }
  showDiseasInMonth(month:string){
    this.getSickInMonth(month).subscribe((data: sumSick[]) => {console.log(data);debugger; this.listSickInMonth = data },
      (    err: string) => { "ERROR" + err });
      debugger
  }
 

}

