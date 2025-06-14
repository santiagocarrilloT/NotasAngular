# NotasAngular

# 📝 Aplicación de Notas con Angular + JSON Server

Esta es una aplicación web desarrollada con **Angular** que permite gestionar tareas mediante operaciones CRUD. La aplicación incluye funcionalidades como autenticación simulada, pruebas unitarias básicas y un sistema de búsqueda avanzada.

## Descripción breve

La aplicación de notas permite:

-  Crear, leer, actualizar y eliminar tareas (CRUD completo)
-  Simulación de inicio de sesión (login simulado)
-  Búsqueda por **estado**, **título** y **descripción** de las tareas
-  Pruebas unitarias en 2 componentes clave
-  Backend simulado usando **JSON Server**
-  Permite ejecutar la aplicación en móviles (No permite acciones desde BD dado el entorno de JSON Serve)

Cada tarea contiene:

- Título
- Descripción
- Estado (`Pendiente`, `En progreso`, `Finalizada`)

---

## Tecnologías utilizadas

- Angular
- JSON Server
- TypeScript
- Jasmine + Karma (pruebas)

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
npx json-server --watch db.json --port 3000
ionic serve
ng test
