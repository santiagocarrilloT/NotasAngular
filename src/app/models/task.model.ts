export interface Task {
  title: string;
  description: string;
  estate: 'Pendiente' | 'En Progreso' | 'Completado';
}

interface createTask {
  title: string;
  description: string;
  estate: 'Pendiente' | 'En Progreso' | 'Completado';
}

interface updateTask {
  title: string;
  description: string;
  estate: 'Pendiente' | 'En Progreso' | 'Completado';
}
