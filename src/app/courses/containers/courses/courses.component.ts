import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  imports: [
    AppMaterialModule,
    AsyncPipe,
    CoursesListComponent,
    NgIf,
    SharedModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        console.log(error);
        this.onError('Erro ao carregar cursos.');
        return of ([])
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
