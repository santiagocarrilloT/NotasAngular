import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSearchbar,
  IonList,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskTableComponent } from '../component/task-table/task-table.component';

import { addIcons } from 'ionicons';
import { add, logOutOutline, searchCircle } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButtons,
    IonFab,
    IonFabButton,
    IonMenuButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    RouterModule,
    TaskTableComponent,
    FormsModule,
  ],
})
export class MainPage implements OnInit {
  tasks: Task[] = [];
  form: FormGroup;
  selectedState: string = 'Todas';
  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {
    addIcons({
      add,
      searchCircle,
      logOutOutline,
    });
    this.form = this.fb.group({
      state: ['Todas'],
    });
  }

  ngOnInit() {
    /* this.taskService
      .createTask({
        title: 'Nueva tarea',
        description: 'Descripción',
        estate: 'Pendiente',
      })
      .subscribe({
        next: (task) => {
          console.log('Tarea creada:', task);
        },
        error: (err) => {
          console.error('Error al crear tarea:', err);
        },
      }); */
  }

  goTaskForm() {
    this.router.navigate(['/task']);
  }

  goSearch() {
    this.router.navigate(['/search']);
  }

  filterTasks(event: CustomEvent) {
    const searchValue = event.detail.value;

    if (searchValue === 'Todas') {
      this.ionViewWillEnter();
      return;
    }

    this.taskService.searchTasksState(searchValue).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error al actualizar tareas:', err);
      },
    });
  }

  ionViewWillEnter() {
    this.selectedState = '';
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error al actualizar tareas:', err);
      },
    });
  }

  async onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
