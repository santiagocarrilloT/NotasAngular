import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

type ApiResponse = {
  title: string;
  description: string;
  estate: 'Pendiente' | 'En Progreso' | 'Completado';
  id: number;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'http://localhost:3000';
  private tasksUrl = `${this.url}/task`;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  //Conseguir todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  //Conseguir una tarea por Id
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.tasksUrl}/${id}`);
  }

  //Crear una tarea
  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task);
  }

  //Actualizar una tarea
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task);
  }

  //Eliminar una tarea
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/${id}`);
  }

  //Buscar tareas
  searchTasks(
    query: string,
    status?: 'Pendiente' | 'En Progreso' | 'Finalizada' | 'all'
  ): Observable<Task[]> {
    let params: any = {};
    if (query) {
      params = { ...params, q: query };
    }

    if (status && status !== 'all') {
      params = { ...params, s: status };
    }

    return this.http.get<Task[]>(this.tasksUrl, { params: params });
  }

}
