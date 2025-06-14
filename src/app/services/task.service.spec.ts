import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  // Datos para la prueba
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Tarea de prueba 1',
      description: 'Descripción de la tarea 1',
      state: 'En Progreso',
    },
    {
      id: '11',
      title: 'Tarea de prueba 2',
      description: 'Descripción de la tarea 2',
      state: 'Completado',
    },
  ];

  const mockTask: Task = {
    id: '1',
    title: 'Tarea individual',
    description: 'Descripción de tarea individual',
    state: 'Pendiente',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Crea un nueva tarea', () => {
    const newTask: Omit<Task, 'id'> = {
      title: 'Test',
      description: 'Descripción Test',
      state: 'Pendiente',
    };

    const createdTask: Task = { ...newTask, id: '89' };

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(createdTask);
      expect(task.id).toBeDefined();
    });

    const req = httpMock.expectOne(service.tasksUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(createdTask);
  });

  it('Actualiza una tarea', () => {
    const updateTask: Task = {
      id: '10',
      title: 'Test',
      description: 'Descripción Test',
      state: 'Pendiente',
    };

    service.updateTask(updateTask).subscribe((task) => {
      expect(task).toEqual(updateTask);
    });

    const req = httpMock.expectOne(`${service.tasksUrl}/${updateTask.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateTask);
    req.flush(updateTask);
  });

  it('Búsqueda de un query vacío', () => {
    service.searchTasks('').subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(service.tasksUrl);
    req.flush(mockTasks);
  });

  it('Búsqueda de tarea por título', () => {
    const query = 'Tarea de prueba 1';
    service.searchTasks(query).subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toContain(query);
    });

    const req = httpMock.expectOne(service.tasksUrl);
    req.flush(mockTasks);
  });

  it('Búsqueda de tarea por descripción', () => {
    const query = 'Descripción de la tarea 2';
    service.searchTasks(query).subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].description).toContain(query);
    });

    const req = httpMock.expectOne(service.tasksUrl);
    req.flush(mockTasks);
  });

  it('Búsqueda que retorne en array vacío', () => {
    const query = 'No existe esta tarea';
    service.searchTasks(query).subscribe((tasks) => {
      expect(tasks.length).toBe(0);
    });

    const req = httpMock.expectOne(service.tasksUrl);
    req.flush(mockTasks);
  });

  it('Búsqueda de tareas por estado', () => {
    const state = 'Completado';
    const filteredTasks = mockTasks.filter(
      (task) => task.state === 'Completado'
    );

    service.searchTasksState(state).subscribe((task) => {
      expect(task).toEqual(filteredTasks);
    });

    const req = httpMock.expectOne((req) => {
      return req.url === service.tasksUrl && req.params.get('state') === state;
    });

    expect(req.request.method).toBe('GET');
    req.flush(filteredTasks);
  });

  it('Elimina una tarea', () => {
    const taskId = '1';

    service.deleteTask(taskId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.tasksUrl}/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
