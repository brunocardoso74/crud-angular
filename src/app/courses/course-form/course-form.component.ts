import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private service: CoursesService,
    private formBuilder: FormBuilder,
    private location: Location
    ) {
    console.log('constructor');

    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit() {
    this.service.save(this.form.value as Course)
      .subscribe({
        next: (result) => {
          console.log('Curso salvo com sucesso!')
          this.onSuccess()
        },
        error: (error) => this.onError()
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this._snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }

}
