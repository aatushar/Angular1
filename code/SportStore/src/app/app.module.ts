import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from "./store/store.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { provideHttpClient } from '@angular/common/http';
import { StaticDataSource } from '../model/static.datasource';
import { ProductRepository } from '../model/product.repository';
import { CheckoutComponent } from './store/checkout.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { RouterModule } from '@angular/router';
import { StoreFirstGuard } from './storeFirst.guard';



@NgModule({
  declarations: [
    AppComponent,
    //StoreComponent,
    
  ],
  imports: [BrowserModule, StoreModule,
    // RouterModule.forRoot([
    // { path: "store", component: StoreComponent },
    // { path: "cart", component: CartDetailComponent },
    // { path: "checkout", component: CheckoutComponent },
    // { path: "**", redirectTo: "/store" }
    // ])
    RouterModule.forRoot([
      {
      path: "store", component: StoreComponent,
      canActivate: [StoreFirstGuard]
      },
      {
      path: "cart", component: CartDetailComponent,
      canActivate: [StoreFirstGuard]
      },
      {
      path: "checkout", component: CheckoutComponent,
      canActivate: [StoreFirstGuard]
      },
      {
        path: "admin",
        loadChildren: () => import("./admin/admin.module")
        .then(m => m.AdminModule),
        canActivate: [StoreFirstGuard]
        },
      { path: "**", redirectTo: "/store" }
      
      ])],
      

      
 

    
  // imports: [
  //   BrowserModule,
  //   AppRoutingModule,
  //   StoreModule,
  //   CheckoutComponent,
  //   CartDetailComponent
    
  // ],
  providers: [
    provideHttpClient(),
    StaticDataSource,
    ProductRepository,
    StoreFirstGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
