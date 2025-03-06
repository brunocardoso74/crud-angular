import { ResolveFn } from '@angular/router';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
//constructor(private servicer: CoursesService) {}

export const courseResolver: ResolveFn<Course> = (route, state) => {
  const service = inject(CoursesService);

  if (route.params && route.params['id']) {
    return service.loadById(route.params['id']);
  }

  return of({ _id: '', name: '', category: '' });
};
