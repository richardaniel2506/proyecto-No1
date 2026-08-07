import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="auth-container fade-in">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Crear Cuenta</mat-card-title>
          <mat-card-subtitle>Únete a nuestra plataforma</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            
            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="nombre" placeholder="Tu nombre">
                <mat-error *ngIf="registerForm.get('nombre')?.hasError('required')">Requerido</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Apellido</mat-label>
                <input matInput formControlName="apellido" placeholder="Tu apellido">
                <mat-error *ngIf="registerForm.get('apellido')?.hasError('required')">Requerido</mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Correo Electrónico</mat-label>
              <input matInput formControlName="email" type="email" placeholder="ejemplo@correo.com">
              <mat-icon matPrefix>email</mat-icon>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">El correo es obligatorio</mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Formato de correo inválido</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'">
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Requerida</mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">Mín. 6 caracteres</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirmar Contraseña</mat-label>
              <input matInput formControlName="confirmPassword" [type]="hideConfirmPassword ? 'password' : 'text'">
              <mat-icon matPrefix>lock_outline</mat-icon>
              <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched">
                Las contraseñas no coinciden
              </mat-error>
            </mat-form-field>

            <div class="error-message" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>

            <button mat-raised-button color="primary" type="submit" class="submit-btn full-width" [disabled]="registerForm.invalid || isLoading">
              <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
              <span *ngIf="!isLoading">REGISTRARSE</span>
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions class="auth-actions">
          <p>¿Ya tienes cuenta? <a routerLink="/auth/login" class="link">Inicia sesión</a></p>
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
      padding: 1rem;
    }
    .auth-card {
      width: 100%;
      max-width: 450px;
      padding: 2rem;
      border-radius: 16px;
    }
    mat-card-header {
      margin-bottom: 1.5rem;
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
    .form-row {
      display: flex;
      gap: 1rem;
    }
    .half-width {
      flex: 1;
    }
    .full-width {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .submit-btn {
      height: 48px;
      font-size: 1rem;
      margin-top: 1.5rem;
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
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  errorMessage = '';

  registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { confirmPassword, ...registerData } = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Registro exitoso. Por favor inicia sesión.', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.error || 'Ocurrió un error al registrar el usuario.';
          console.error(err);
        }
      });
    }
  }
}
