import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { Course } from '../../model/course';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';

@Component({
  selector: 'app-courses-list',
  imports: [
    AppMaterialModule,
    SharedModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns: string[] = [ 'name', 'category', 'actions' ];

  constructor() {  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course)
  }

  onRemove(course: Course) {
    this.remove.emit(course)
  }
}
