import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  apiEndPoint: string = "https://freeapi.miniprojectideas.com/api/zomato/";

  constructor(private http: HttpClient) { }

  getAllFoods(): Observable <any>{
    return this.http.get(this.apiEndPoint + "GetAllFoodCategory")
  }
  GetRestaurantServingByCategoryId(foodCategoryId: number): Observable<any>{
    return this.http.get(this.apiEndPoint + 'GetRestaurantServingByCategoryId?CategoryId='+ foodCategoryId)
  }
}
