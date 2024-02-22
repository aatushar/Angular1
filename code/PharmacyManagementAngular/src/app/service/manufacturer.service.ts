import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Manufacturer } from '../model/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private apiUrl = "http://localhost:8085/api/manufacturer";

 

  constructor(private http: HttpClient) {}

  getAllManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getManufacturerById(id: number): Observable<Manufacturer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Manufacturer>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(this.apiUrl, manufacturer)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    const url = `${this.apiUrl}/${manufacturer.id}`;
    return this.http.put<Manufacturer>(url, manufacturer)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteManufacturer(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
