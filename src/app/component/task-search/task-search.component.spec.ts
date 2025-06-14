import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IonicModule } from '@ionic/angular';

import { TaskSearchComponent } from './task-search.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Descripcion 1',
      state: 'Pendiente',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Descripcion 2',
      state: 'Completado',
    },
  ];
  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['searchTasks']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TaskSearchComponent, IonicModule.forRoot()],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    mockTaskService = TestBed.inject(
      TaskService
    ) as jasmine.SpyObj<TaskService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be create', () => {
    expect(component).toBeTruthy();
  });

  it('navega hacia la página anterior', () => {
    component.goBack();

    expect(component.isLoading).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('busca tareas con éxito', fakeAsync(() => {
    mockTaskService.searchTasks.and.returnValue(of(mockTasks));

    const event = { detail: { value: 'Descripcion' } } as CustomEvent;
    component.searchTasks(event);

    tick(500);

    expect(mockTaskService.searchTasks).toHaveBeenCalledWith('Descripcion');
    expect(component.isLoading).toBeFalse();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.notFoundMessage).toBe('');
  }));

  it('muestra el mensaje de no encontrado', fakeAsync(() => {
    mockTaskService.searchTasks.and.returnValue(of([]));

    const event = { detail: { value: 'No existe una tarea' } } as CustomEvent;
    component.searchTasks(event);

    tick(600);

    expect(component.tasks).toEqual([]);
    expect(component.notFoundMessage).toBe(
      'No se encontraron tareas con ese criterio'
    );
    expect(component.isLoading).toBeFalse();
  }));

  it('maneja el error en la búsqueda', fakeAsync(() => {
    mockTaskService.searchTasks.and.returnValue(throwError('Search error'));

    const event = { detail: { value: 'error search' } } as CustomEvent;
    component.searchTasks(event);

    tick(300);

    expect(component.isLoading).toBeTrue();
    expect(component.notFoundMessage).toBe('');
  }));

  it('borra los resultados en búsqueda vacía', () => {
    const event = { detail: { value: '' } } as CustomEvent;
    component.searchTasks(event);

    expect(component.isLoading).toBeFalse();
    expect(component.tasks).toEqual([]);
    expect(component.notFoundMessage).toBe('');
  });
});
