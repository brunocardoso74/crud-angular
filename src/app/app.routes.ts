import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadComponent: () => import('./courses/courses/courses.component').then(m => m.CoursesComponent)
  },
  {
    path: 'coursess',
    loadChildren:() => import('./courses/courses-routing.module').then(m => m.CoursesRoutingModule)
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule {}
