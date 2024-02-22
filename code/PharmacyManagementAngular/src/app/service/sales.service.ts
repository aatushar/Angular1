import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sales } from '../model/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private baseUrl = 'http://localhost:8085/api/sales'; // URL to your API endpoint


  constructor(private http: HttpClient) { }

  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addSale(sales: Sales): Observable<Sales> {
    return this.http.post<any>(this.baseUrl, sales);
  }

}
