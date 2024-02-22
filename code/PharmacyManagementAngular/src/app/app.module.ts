import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicineComponent } from './medicine/medicine/medicine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SalesComponent } from './salse/sales/sales.component';
import { GenericComponent } from './generic/generic.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppFooterComponent } from './app-footer/app-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicineComponent,
    SalesComponent,
    GenericComponent,
    ManufacturerComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppMainComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
