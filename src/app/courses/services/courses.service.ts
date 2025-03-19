import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';

import { Course } from '../model/course';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiUrl = 'api/courses';

  constructor(private readonly httpClient: HttpClient) { }

  list(page = 0, pageSize = 10): Observable<CoursePage> {
    return this.httpClient.get<CoursePage>(this.apiUrl, { params: { page: page, pageSize: pageSize } })
    .pipe(
      first(),
      //delay(1000),
      //tap(courses => console.log(courses))
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.apiUrl}/${id}`);
  }

  save(record: Course): Observable<any> {
    if (record._id) {
      console.log('update')
      return this.update(record);
    }
    console.log('create')
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.apiUrl, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.apiUrl}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete<Course>(`${this.apiUrl}/${id}`).pipe(first());
  }
}
