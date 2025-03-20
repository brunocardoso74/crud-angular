import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//import { COURSES_ROUTES } from './courses/courses.routes';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  /*{
    path: 'courses',
    loadComponent: () => import('./courses/courses/courses.component').then(m => m.CoursesComponent)
  },*/
  {
    path: 'courses',
    loadChildren:() => import('./courses/courses.routes').then(m => m.COURSES_ROUTES)
  }
];

