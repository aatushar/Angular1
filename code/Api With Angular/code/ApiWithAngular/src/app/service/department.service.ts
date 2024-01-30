import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl:string="http://localhost:8085/api/department";

  constructor(private http:HttpClient) { }

getAllDep(){
  return this.http.get<any>(this.baseUrl)
    .pipe(map(res=>{
      return res;
    }))

}

saveDep(data:any){
  return this.http.post<any>(this.baseUrl, data)
    .pipe(map(res=>{
      return res;
    }))

}




  


}
