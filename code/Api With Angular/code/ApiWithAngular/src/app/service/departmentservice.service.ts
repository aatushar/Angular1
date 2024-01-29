// import {HttpClient} from '@angular/common/http';
// import { Injectable} from '@angular/core';
// import {mpap} from 'rxjs';




// @Injectable({
//     providedIn:'root'
// })
// export class Departmentserviceservice{
//     baseUrl: string="http://localhost:8082/api/department";

//     constructor(private http:Httpclient){ }

//     getAllDep(){
//         return this.http.get<any>(this.baseUrl)
//         .pipe(map(res=>{
//             return res;
//         }))
//     }

//     saveDep(data:any){
//         return this.http.post<any>(this.baseUrl, data)
//         .pipe(map(res=>{
//             return res;
//         }))
//     }
// }