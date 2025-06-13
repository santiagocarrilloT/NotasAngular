import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonText,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  checkmarkCircleOutline,
  chevronUpOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [
    CommonModule,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonSelect,
    IonText,
    IonSelectOption,
    ReactiveFormsModule,
  ],
})
export class TaskFormComponent implements OnInit {
  @ViewChild('formTask', { static: false })
  taskForm!: ElementRef;
  task: Task | null = null;
  typeForm: 'Crear' | 'Editar' = 'Crear';
  form: FormGroup;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({
      checkmarkCircleOutline,
      arrowBack,
      chevronUpOutline,
      closeCircleOutline,
    });
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  goBack() {
    this.router.navigate(['/main']);
    this.form.reset();
  }

  deleteTask() {
    if (!this.task) {
      console.error('No se puede eliminar');
      return;
    }
    this.taskService.deleteTask(this.task?.id).subscribe({
      next: () => {
        this.presentToast('Tarea eliminada correctamente', 'danger');
        this.router.navigate(['/main']);
      },
      error: (err) => {},
    });
  }

  saveTask() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const title = this.form.value.title;
      const description = this.form.value.description;
      const state = this.form.value.state;

      /* Crear una nota si el tipo es crear o si no editar */
      if (this.typeForm === 'Crear') {
        /* Crear una nueva tarea */
        this.taskService
          .createTask({
            title: title,
            description: description,
            state: state,
          })
          .subscribe({
            next: (task) => {
              this.presentToast('Tarea creada correctamente', 'success');
              console.log('Tarea creada:', task);
            },
            error: (err) => {
              this.presentToast('Error al crear tarea', 'danger');
              console.error('Error al crear tarea:', err);
            },
          });
      } else if (this.typeForm === 'Editar' && this.task) {
        const updatedTask: Task = {
          ...this.task,
          title,
          description,
          state: state,
        };
        /* Editar una tarea */
        this.taskService.updateTask(updatedTask).subscribe({
          next: (task) => {
            this.presentToast('Tarea editada correctamente', 'success');
          },
          error: (err) => {
            this.presentToast('Error al editar', 'danger');
            console.error('Error al actualizar tarea:', err);
          },
        });
      }
    } else {
      console.error('Formulario inválido:', this.form.errors);
    }
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id = String(this.route.snapshot.paramMap.get('id'));
      this.taskService.getTask(id).subscribe({
        next: (task) => {
          this.typeForm = 'Editar';
          this.task = task;

          //Asignar valores del formulario
          this.form.patchValue({
            title: task.title,
            description: task.description,
            state: task.state,
          });
        },
        error: (err) => {
          console.error('Error al obtener tarea:', err);
        },
      });
    }
  }

  /* Cargar componentes de nuevo */
  ionViewWillEnter() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.typeForm = 'Editar';
        this.task = task;

        //Asignar valores del formulario
        this.form.patchValue({
          title: task.title,
          description: task.description,
          state: task.state,
        });
      },
      error: (err) => {
        console.error('Error al obtener tarea:', err);
      },
    });
  }

  async presentToast(message: string, color: 'danger' | 'success' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
