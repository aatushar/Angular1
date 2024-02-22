import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineComponent } from './medicine/medicine/medicine.component';
import { SalesComponent } from './salse/sales/sales.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { GenericComponent } from './generic/generic.component';
import { AppMainComponent } from './app-main/app-main.component';

const routes: Routes = [
  {path: 'addmedicine', component: MedicineComponent},
  {path: 'addsales', component: SalesComponent},
  {path: 'addmanufacturer', component: ManufacturerComponent},
  {path: 'addgeneric', component: GenericComponent},
  {path: 'dashboard', component: AppMainComponent},
  { path: "**", redirectTo: "/dashboard", pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
