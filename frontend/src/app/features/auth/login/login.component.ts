import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="auth-container fade-in">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Bienvenido de nuevo</mat-card-title>
          <mat-card-subtitle>Inicia sesión en tu cuenta</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Correo Electrónico</mat-label>
              <input matInput formControlName="email" type="email" placeholder="ejemplo@correo.com">
              <mat-icon matPrefix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">El correo es obligatorio</mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Formato de correo inválido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'">
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">La contraseña es obligatoria</mat-error>
            </mat-form-field>

            <div class="error-message" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>

            <button mat-raised-button color="primary" type="submit" class="submit-btn full-width" [disabled]="loginForm.invalid || isLoading">
              <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
              <span *ngIf="!isLoading">INICIAR SESIÓN</span>
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions class="auth-actions">
          <p>¿No tienes cuenta? <a routerLink="/auth/register" class="link">Regístrate aquí</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .auth-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      border-radius: 16px;
    }
    mat-card-header {
      margin-bottom: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    mat-card-title {
      font-size: 1.8rem;
      font-weight: 500;
      color: #333;
      margin-bottom: 0.5rem;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    .submit-btn {
      height: 48px;
      font-size: 1rem;
      margin-top: 1rem;
      background: linear-gradient(to right, #667eea, #764ba2);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .auth-actions {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
    .link {
      color: #764ba2;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    .link:hover {
      color: #667eea;
    }
    .error-message {
      color: #f44336;
      margin-bottom: 1rem;
      text-align: center;
      font-size: 0.9rem;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Credenciales inválidas. Por favor, intenta de nuevo.';
          console.error(err);
        }
      });
    }
  }
}
