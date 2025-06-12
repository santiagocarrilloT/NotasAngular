import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonButton,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { TaskTableComponent } from '../task-table/task-table.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, searchCircle } from 'ionicons/icons';

import { Task } from '../../models/task.model';
import { TaskService } from 'src/app/services/task.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonIcon,
    IonContent,
    IonSearchbar,
    TaskTableComponent,
    IonButton,
  ],
})
export class TaskSearchComponent implements OnInit {
  searchChanged = new Subject<string>();
  @ViewChild('searchBar', { static: false }) searchBar!: IonSearchbar;

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {
    addIcons({
      searchCircle,
      arrowBack,
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 300);
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  searchTasks(event: CustomEvent) {
    const searchValue = event.detail.value || '';

    if (searchValue.length > 2) {
      this.taskService.searchTasks(searchValue).subscribe((tasks) => {
        console.log('tasks', tasks);
        this.tasks = tasks;
      });
    } else {
      this.tasks = [];
    }
  }
}
