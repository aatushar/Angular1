import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../service/food.service'; // Import FoodService

@Component({
  selector: 'app-restaurant-serving-food',
  templateUrl: './restaurant-serving-food.component.html',
  styleUrls: ['./restaurant-serving-food.component.css'] // Corrected property name to styleUrls
})
export class RestaurantServingFoodComponent {

  currentCategoryId: number = 0;
  restaurantList: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService) { // Corrected variable name and added FoodService
    this.activatedRoute.params.subscribe((res: any) => {
      debugger;
      this.currentCategoryId = res.id;
      this.GetRestaurantServingByCategoryId(); // Corrected method name
    });
  }

  GetRestaurantServingByCategoryId() { // Corrected method name
    this.foodService.GetRestaurantServingByCategoryId(this.currentCategoryId).subscribe((res: any) => {
      this.restaurantList = res.data;
    });
  }
}
