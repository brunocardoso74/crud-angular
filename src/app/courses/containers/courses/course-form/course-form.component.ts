import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Course } from '../../../model/course';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-course-form',
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form: FormGroup;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private service: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private route: ActivatedRoute
    ) {
    console.log('constructor');

    this.form = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    console.log(course);

    this.form.setValue ({
      _id: course._id,
      name: course.name,
      category: course.category
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

  public getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }
}
