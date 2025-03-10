import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './containers/courses/courses.component';


@NgModule({
  declarations: [],
  imports: [
    AppMaterialModule,
    CommonModule,
    CoursesRoutingModule,
    CoursesComponent,
    SharedModule
  ]
})
export class CoursesModule { }
