import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/layout/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatCardModule, MatIconModule],
  template: `
    <div class="dashboard-layout">
      <app-navbar></app-navbar>
      
      <main class="dashboard-content fade-in">
        <div class="welcome-container" *ngIf="authService.currentUser$ | async as user">
          <h1 class="welcome-title">Bienvenido, {{ user.nombre }} 👋</h1>
          <p class="welcome-subtitle">Este es el panel principal de tu aplicación base</p>
          
          <div class="stats-grid">
            <mat-card class="stat-card stat-blue">
              <mat-icon class="stat-icon">group</mat-icon>
              <div class="stat-info">
                <h3>Roles Asignados</h3>
                <p>{{ user.roles.join(', ') }}</p>
              </div>
            </mat-card>
            
            <mat-card class="stat-card stat-purple">
              <mat-icon class="stat-icon">email</mat-icon>
              <div class="stat-info">
                <h3>Correo Electrónico</h3>
                <p>{{ user.email }}</p>
              </div>
            </mat-card>
            
            <mat-card class="stat-card stat-green">
              <mat-icon class="stat-icon">verified_user</mat-icon>
              <div class="stat-info">
                <h3>Estado</h3>
                <p>Activo</p>
              </div>
            </mat-card>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f5f7fa;
    }
    .dashboard-content {
      padding: 2rem;
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }
    .welcome-title {
      font-size: 2.5rem;
      font-weight: 300;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    .welcome-subtitle {
      font-size: 1.1rem;
      color: #7f8c8d;
      margin-bottom: 3rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .stat-card {
      display: flex;
      flex-direction: row !important;
      align-items: center;
      padding: 1.5rem !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: default;
    }
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 20px rgba(0,0,0,0.1) !important;
    }
    .stat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-right: 1.5rem;
    }
    .stat-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 500;
      opacity: 0.8;
    }
    .stat-info p {
      margin: 0;
      font-size: 1.2rem;
      font-weight: bold;
    }
    .stat-blue {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }
    .stat-purple {
      background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
      color: white;
    }
    .stat-green {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
}
