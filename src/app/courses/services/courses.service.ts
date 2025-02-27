import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiUrl = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.apiUrl)
    .pipe(
      first(),
      delay(1000),
      tap(courses => console.log(courses))
    );
  }

  save(record: Course): Observable<any> {
    console.log(record);
    return this.httpClient.post<Course>(this.apiUrl, record).pipe(first());
  }
}
