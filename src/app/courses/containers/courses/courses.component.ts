import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursePage } from '../../model/course-page';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-courses',
  imports: [
    MatCardModule,
    MatToolbarModule,
    CoursesListComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    AsyncPipe
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  courses$: Observable<CoursePage> | null = null;

  pageIndex = 0;
  pageSize = 10;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
    this.courses$ = this.coursesService
    .list(pageEvent.pageIndex, pageEvent.pageSize)  
    .pipe(
      tap((): void => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        console.log(error);
        this.onError('Erro ao carregar cursos.');
        return of ({ courses: [], totalElements: 0, totalPages: 0 } as CoursePage);
      })
    );
  }

  ngOnInit(): void { }

  onAdd() {
    console.log('onAdd');
    this.router.navigate(['new'], {relativeTo: this.route});
    //this.router.navigate(['/courses/new']);
  }

  onEdit(course: Course) {
    console.log('onEdit');
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
    //this.router.navigate(['/courses/new']);
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (result: boolean) => {
          if (result) {
            this.coursesService.remove(course._id)
              .subscribe({
                next: () => {
                  this.refresh();
                  this._snackBar.open('Curso removido com sucesso!', 'X', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center' });
                },
                error: (error) => this.onError('Erro ao tentar remover o curso.')
              });
          }
        }
      });
  }

  /*
  onQuestion(): boolean {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe(result: boolean);

    return result;
  }
    */

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
