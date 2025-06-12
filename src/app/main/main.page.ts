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
} from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskTableComponent } from '../component/task-table/task-table.component';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Router } from '@angular/router';
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
    RouterModule,
    TaskTableComponent,
  ],
})
export class MainPage implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService, private router: Router) {
    addIcons({
      add,
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
        // Aquí puedes mostrar un mensaje al usuario
      },
    });

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

  ionViewWillEnter() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error al actualizar tareas:', err);
        // Aquí puedes mostrar un mensaje al usuario
      },
    });
  }
}
