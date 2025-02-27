import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [
    AppMaterialModule,
    AsyncPipe,
    NgIf,
    SharedModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns: string[] = [ 'name', 'category', 'actions' ];

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        console.log(error);
        this.onError('Erro ao carregar cursos.');
        return of ([])
      })
    );
  }

  ngOnInit(): void {

  }

  onAdd() {
    console.log('onAdd');
    this.router.navigate(['new'], {relativeTo: this.route});
    //this.router.navigate(['/courses/new']);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
