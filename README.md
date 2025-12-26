# 🧾 Trabajo Final – Sistema de Gestión de Productos

Proyecto full stack desarrollado como Trabajo Final para la materia Desarrollo Web.

## 📌 Descripción
Aplicación web para la gestión de productos con autenticación, roles y control de stock.
Permite a usuarios administradores crear, editar y eliminar productos, mientras que los usuarios comunes solo pueden visualizar.

## 🛠 Tecnologías
### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT (JSON Web Token)
- bcrypt
- Morgan
- express-rate-limit
- dotenv
- CORS

## 📂 Estructura del proyecto Backend

```bash
src/
├── config/
│   └── db.ts
├── controllers/
│   ├── auth.controller.ts
│   └── product.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   └── rateLimit.middleware.ts
├── model/
│   ├── user.model.ts
│   └── product.model.ts
├── routes/
│   ├── auth.routes.ts
│   └── product.routes.ts
├── index.ts
```
### Frontend
- React
- Context API
- Axios
- CSS

### 🔐 Autenticación y Seguridad

Autenticación mediante JWT

Middleware authMiddleware para proteger rutas

Middleware requireRole("admin") para acciones restringidas

Passwords hasheados con bcrypt

Tokens enviados por Authorization Header

### 🚦 Rate Limit

El rate limit se aplica solo en las rutas de autenticación para evitar ataques de fuerza bruta:

5 intentos

Ventana de 15 minutos

### 🧾 Logger

Se utiliza Morgan para registrar las peticiones HTTP:

app.use(morgan("dev"));

### 🧪 Validaciones Backend

Las validaciones se realizan directamente en los controllers:

Nombre mínimo de 3 caracteres

Precio mayor a 0

Stock no negativo

Categoría obligatoria
### ⚙️ Instalación

### Backend
```bash
cd backend
npm install
npm run dev

👤 Usuario de prueba
Email: ren@gmail.com
Password: ren12345
Rol: admin
```


### 👨‍💻 Autor

Héctor Landaeta
Trabajo Final – Desarrollo y Deploy de una API REST
2025