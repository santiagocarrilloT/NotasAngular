import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../config';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { LoginResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = API_URL;
  private userUrl = `${this.url}/users`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  private checkSession() {
    const storesUser = localStorage.getItem('user');
    const storesToken = localStorage.getItem('token');

    if (storesUser && storesToken) {
      this.currentUserSubject.next(JSON.parse(storesUser));
    }
  }

  login(username: string, password: string): Observable<LoginResponse | null> {
    return this.http.get<any[]>(`${this.userUrl}`).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          const token = Math.random().toString(36).substring(2, 15);

          /* Guardar los datos */
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              id: user.id,
              username: user.username,
              email: user.email,
            })
          );
          localStorage.setItem('authToken', token);

          this.currentUserSubject.next({
            id: user.id,
            username: user.username,
            email: user.email,
          });

          return {
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
            token: token,
          };
        }

        return null;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return [null];
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
