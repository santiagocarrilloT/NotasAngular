import { Component, OnInit } from '@angular/core';
import { TaskFormComponent } from '../../component/task-form/task-form.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [TaskFormComponent],
})
export class TaskComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
