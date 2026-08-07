import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary" class="navbar mat-elevation-z4">
      <button mat-icon-button class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>
      
      <span class="spacer"></span>
      
      <span class="app-title">Dashboard Premium</span>
      
      <span class="spacer"></span>
      
      <div *ngIf="authService.currentUser$ | async as user" class="user-info">
        <span class="user-name">{{ user.nombre }}</span>
        <button mat-icon-button [matMenuTriggerFor]="menu" class="user-avatar-btn">
          <div class="avatar">{{ user.nombre.charAt(0) | uppercase }}</div>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>Mi Perfil</span>
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Cerrar Sesión</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      background: linear-gradient(to right, #667eea, #764ba2);
      color: white;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .app-title {
      font-weight: 500;
      letter-spacing: 1px;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .user-name {
      font-size: 0.9rem;
      font-weight: 400;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: white;
      color: #764ba2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 1rem;
    }
    .user-avatar-btn {
      width: 40px;
      height: 40px;
      padding: 4px;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
