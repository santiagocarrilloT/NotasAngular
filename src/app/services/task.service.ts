import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient){}

  getTasks(): Observable
}
