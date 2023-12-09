import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { Router } from '@angular/router'; // Import Router from '@angular/router'

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'] // Corrected property name to styleUrls
})
export class FoodsComponent implements OnInit {
  foodItems: any[] = [];

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllFoodCategory(); // Corrected method name
  }

  loadAllFoodCategory() {
    this.foodService.getAllFoods().subscribe((res: any) => {
      this.foodItems = res.data;
    });
  }

  navigateToRestaurantFoods(categoryId: number) {
    this.router.navigate(['/restaurant-food', categoryId]);
  }
}


