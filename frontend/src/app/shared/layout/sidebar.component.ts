import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <div class="sidebar">
      <div class="logo">App Base</div>
      <nav class="nav-links">
        <a class="nav-link active">Dashboard</a>
        <a class="nav-link">Usuarios</a>
        <a class="nav-link">Configuración</a>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background-color: #2c3e50;
      color: white;
      display: flex;
      flex-direction: column;
    }
    .logo {
      padding: 1.5rem;
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
    }
    .nav-link {
      padding: 1rem 1.5rem;
      color: #ecf0f1;
      text-decoration: none;
      transition: background-color 0.2s;
      cursor: pointer;
    }
    .nav-link:hover, .nav-link.active {
      background-color: #34495e;
      border-left: 4px solid #3498db;
    }
  `]
})
export class SidebarComponent {
}
