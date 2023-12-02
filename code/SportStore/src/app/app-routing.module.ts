import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  // {path:"store",component:StoreComponent},
  // {path:"cart",component:StoreComponent},
  // {path:"checkout",component:StoreComponent},
  // { path: "**", redirectTo: "/store" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
