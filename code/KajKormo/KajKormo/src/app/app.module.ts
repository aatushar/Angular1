import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';

import { ProfileComponent } from './emp-profile/profile/profile.component';
import { ɵInternalFormsSharedModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmpProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ɵInternalFormsSharedModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
