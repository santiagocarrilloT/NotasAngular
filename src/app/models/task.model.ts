export type Estate = 'Pendiente' | 'En Progreso' | 'Completado';

export interface Task {
  id: string;
  title: string;
  description: string;
  state: Estate;
}
