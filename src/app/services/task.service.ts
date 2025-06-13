import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Task } from '../models/task.model';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = API_URL;
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

  //Buscar tareas sin query (Para titulo/text)
  searchTasks(query: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      map((tasks) => {
        if (!query) return tasks;
        return tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }

  //Buscar tareas con query (Para titulo/text)
  searchTasksState(query: string): Observable<Task[]> {
    const params = new HttpParams().set('state', query);
    return this.http.get<Task[]>(this.tasksUrl, { params });
  }
}
