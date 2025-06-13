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
  IonSpinner,
  IonText,
  IonCardContent,
} from '@ionic/angular/standalone';
import { TaskTableComponent } from '../task-table/task-table.component';
import { Router } from '@angular/router';
import { arrowBack, searchCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { Task } from '../../models/task.model';
import { TaskService } from 'src/app/services/task.service';

import { debounceTime, Subject } from 'rxjs';

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
    IonSpinner,
    IonText,
    IonCardContent,
  ],
})
export class TaskSearchComponent implements OnInit {
  searchChanged = new Subject<string>();
  @ViewChild('searchBar', { static: false }) searchBar!: IonSearchbar;
  isLoading = false;
  notFoundMessage = '';

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
    this.isLoading = false;
    this.router.navigate(['/main']);
  }

  searchTasks(event: CustomEvent) {
    const searchValue = event.detail.value || '';

    if (searchValue.length != '') {
      this.searchChanged.next(searchValue);

      this.isLoading = true;
      this.searchChanged.pipe(debounceTime(300)).subscribe((searchParam) => {
        this.taskService.searchTasks(searchParam).subscribe({
          next: (tasks) => {
            this.isLoading = false;
            this.tasks = tasks;

            if (tasks.length === 0) {
              this.notFoundMessage =
                'No se encontraron tareas con ese criterio';
            } else {
              this.notFoundMessage = '';
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.notFoundMessage = 'Error al cargar tareas:';
          },
        });
      });
    } else {
      this.isLoading = false;
      this.notFoundMessage = '';
      this.tasks = [];
    }
  }
}
