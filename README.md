# Base Full Stack Project (Spring Boot & Angular)

Este es un proyecto base configurado con las mejores prácticas de desarrollo y arquitectura. Utiliza Spring Boot en el backend y Angular en el frontend, conectado a una base de datos PostgreSQL utilizando Docker.

## Tecnologías Utilizadas

- **Backend:** Java 21, Spring Boot 3.x, Spring Security (JWT), Spring Data JPA, Flyway, Maven.
- **Frontend:** Angular 18 (o última versión estable), Angular Material, RxJS, Reactive Forms.
- **Base de Datos:** PostgreSQL.
- **Infraestructura:** Docker & Docker Compose.

## Requisitos

- [Java 21](https://jdk.java.net/21/)
- [Node.js](https://nodejs.org/) (Versión recomendada LTS)
- [Docker y Docker Compose](https://www.docker.com/)
- [Maven](https://maven.apache.org/)

## Instalación y Configuración

### 1. Iniciar Base de Datos
Ejecuta el siguiente comando en la raíz del proyecto para iniciar la base de datos PostgreSQL:

```bash
docker-compose up -d
```

### 2. Backend (Spring Boot)
1. Navega a la carpeta `backend`: `cd backend`
2. Instala las dependencias y compila el proyecto: `mvn clean install -DskipTests` o `./mvnw clean install`
3. Inicia la aplicación: `mvn spring-boot:run`

La aplicación backend estará corriendo en: `http://localhost:8080`.
La API expone Swagger (si se configura) y diferentes endpoints en `/api/`.

### 3. Frontend (Angular)
1. Navega a la carpeta `frontend`: `cd frontend`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación en modo desarrollo: `npm start` o `ng serve`

La aplicación frontend estará corriendo en: `http://localhost:4200`.

## Estructura del Proyecto

```text
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java/com/proyecto   # Lógica del servidor
│   │   │   └── resources           # Propiedades y migraciones (Flyway)
│   └── pom.xml
├── frontend
│   ├── src
│   │   ├── app
│   │   │   ├── core              # Guards, Interceptors, Services, Models
│   │   │   ├── features          # Módulos de funcionalidad (Auth, Dashboard)
│   │   │   └── shared            # Componentes reutilizables
│   └── package.json
└── docker-compose.yml
```

## Usuarios de Prueba (Generados por Flyway)
Al inicializar la base de datos, se crean cuentas por defecto:
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123
