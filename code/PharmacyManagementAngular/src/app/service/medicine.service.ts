import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Medicine } from '../model/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private BASEURL = "http://localhost:8085/api/medicine";


  constructor(private http:HttpClient) { }


  getall():Observable<Medicine[]>{
   return this.http.get<Medicine[]>(this.BASEURL)
    .pipe(map(res=> res
    ))

  }

  createMedicine(medicine:Medicine):Observable<Medicine>{

    return this.http.post<Medicine>(this.BASEURL, medicine);

  }




}
