import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonCardTitle,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonItem,
    IonCardTitle,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {
  @ViewChild('usernameInput', { static: false }) usernameInput: any;
  loginGroup!: FormGroup;

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    /* Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/~`]).+$'
        ), */
    this.loginGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginGroup.controls;
  }

  onLogin() {
    this.loginGroup.markAllAsTouched();
    if (this.loginGroup.valid) {
      const { username, password } = this.loginGroup.value;
      this.isLoading = true;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response) {
            console.log('Login successful:', response);
            this.loginGroup.reset();
            // Navigate to the home page or dashboard
            this.router.navigate(['/main']);
          } else {
            this.showError('Contraseña o usuario incorrecto');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error:', error);
        },
      });
    }
  }

  private showError(message: string) {
    this.errorMessage = message;
  }
}
