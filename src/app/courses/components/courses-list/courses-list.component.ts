import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  imports: [
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    CategoryPipe
  ],
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
