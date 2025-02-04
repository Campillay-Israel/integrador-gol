# Gestión Logística - Frontend

Este proyecto es una aplicación web de **gestión logística** desarrollada con **React** y **Material-UI** para el frontend. Permite gestionar órdenes de envío, filtrarlas por estado, crear nuevas órdenes, editar órdenes existentes y ver los detalles de cada una. Además, incluye un sistema de autenticación con **Firebase** para proteger las rutas y registrar las acciones de los usuarios.

## Características principales

### Autenticación de usuarios
- Registro e inicio de sesión con correo electrónico y contraseña.
- Protección de rutas: Solo los usuarios autenticados pueden acceder a las funcionalidades principales.
- El usuario logeado se muestra en la barra de navegación (Navbar).

### Gestión de órdenes
- **Lista de órdenes** con filtrado por estado: *Pendiente*, *En tránsito*, *Entregado*.
- Creación de nuevas órdenes.
- Edición de órdenes existentes.
- Visualización de detalles de cada orden, incluyendo la información sobre quién la creó y quién la modificó.

### Diseño responsivo
- Interfaz amigable y adaptada a diferentes dispositivos.
- Tarjetas interactivas que muestran más información al pasar el mouse.

### Validaciones
- Validación de formularios para evitar campos vacíos.
- Mensajes de error claros para el usuario.

## Tecnologías utilizadas

1. **React**  
   *Justificación:* Biblioteca de JavaScript ampliamente utilizada para construir interfaces de usuario interactivas y reutilizables. Su enfoque basado en componentes permite un desarrollo modular y mantenible.

2. **Material-UI (MUI)**  
   *Justificación:* Librería de componentes UI que sigue los principios de diseño de Google Material Design. Proporciona componentes estilizados y preconstruidos que aceleran el desarrollo y garantizan una experiencia de usuario consistente.

3. **React Router DOM**  
   *Justificación:* Utilizado para manejar la navegación entre vistas de la aplicación de manera dinámica sin necesidad de recargar la página, ideal para crear aplicaciones SPA (Single Page Application).

4. **Firebase Authentication**  
   *Justificación:* Solución rápida y segura para la autenticación de usuarios. Soporta múltiples proveedores de autenticación, pero en este proyecto se utiliza correo electrónico y contraseña.

5. **Redux Toolkit (Opcional)**  
   *Justificación:* Se usa para gestionar el estado global de la aplicación, especialmente útil para manejar las órdenes y el estado de autenticación en aplicaciones complejas.

6. **Axios o Fetch API**  
   *Justificación:* Herramientas para realizar solicitudes HTTP a la API backend (si se utiliza una API externa). **Axios** es preferido por su facilidad de uso y manejo de errores.

7. **Firebase Firestore (Opcional)**  
   *Justificación:* Base de datos NoSQL en tiempo real que permite almacenar y sincronizar datos entre clientes y servidor si se utiliza Firebase como backend.

## Estructura del proyecto

```bash
src/
|-- components/
|   |-- Navbar.jsx          # Barra de navegación con autenticación
|   |-- Login.jsx           # Componente para iniciar sesión
|   |-- Register.jsx        # Componente para registrarse
|   |-- OrdenesList.jsx     # Lista de órdenes con filtrado
|   |-- CreateOrden.js      # Formulario para crear una nueva orden
|   |-- EditOrden.jsx       # Formulario para editar una orden existente
|   |-- OrdenDetail.jsx     # Detalles de una orden específica
|-- store/
|   |-- ordenesSlice.js     # Lógica de Redux para gestionar las órdenes
|-- firebase.js             # Configuración de Firebase
|-- App.js                  # Configuración de rutas y estructura principal
|-- index.js                # Punto de entrada de la aplicación
```
## Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Campillay-Israel/integrador-gol.git
cd integrador-gol```
```


## Ejecutar la aplicación:

```bash
npm start 
```
## Acceder a la aplicación:

Abre tu navegador y visita [http://localhost:3000](http://localhost:3000).

---

## Justificación de las tecnologías aplicadas

- **React**: Elegido por su flexibilidad, rendimiento y amplia comunidad de soporte. Es ideal para construir interfaces de usuario dinámicas y reutilizables.
- **Material-UI**: Proporciona componentes preconstruidos que siguen las mejores prácticas de diseño, lo que acelera el desarrollo y asegura una experiencia de usuario consistente.
- **Firebase Authentication**: Ofrece una solución rápida y segura para la autenticación de usuarios, sin necesidad de configurar un backend complejo.
- **React Router DOM**: Facilita la navegación entre vistas sin recargar la página, mejorando la experiencia del usuario en una SPA (Single Page Application).
- **Redux Toolkit**: Simplifica la gestión del estado global, especialmente útil en aplicaciones con múltiples componentes que comparten datos.


---

