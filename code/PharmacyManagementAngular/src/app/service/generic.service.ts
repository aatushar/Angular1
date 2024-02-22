import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Generic } from '../model/generic.model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private apiUrl = 'http://localhost:8085/api/generic';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Generic[]> {
    return this.http.get<Generic[]>(this.apiUrl);
  }

  getById(id: number): Observable<Generic> {
    return this.http.get<Generic>(`${this.apiUrl}/${id}`);
  }

  create(generic: Generic): Observable<Generic> {
    return this.http.post<Generic>(this.apiUrl, generic);
  }

  update(id: number, generic: Generic): Observable<Generic> {
    return this.http.put<Generic>(`${this.apiUrl}/${id}`, generic);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
