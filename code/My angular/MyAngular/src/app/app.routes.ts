import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import path  from 'path';
import { consumerAfterComputation } from '@angular/core/primitives/signals';
import { AboutsComponent } from './abouts/abouts.component';

export const routes: Routes = [
    {path: "contact", component:ContactComponent},
    {path: "abouts", component:AboutsComponent}
];
