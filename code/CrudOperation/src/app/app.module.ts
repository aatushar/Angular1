import { NgModule,  } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherComponent } from './teacher/teacher.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,provideHttpClient,withFetch } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';






@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatOptionModule,
    
   
    
    

  ],
  providers: [
    provideHttpClient(
      withFetch()
      
    )
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
