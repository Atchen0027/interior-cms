# 📋 Pasos para Desplegar en Render

## ✅ Lo que ya está hecho:

1. ✅ Proyecto Strapi creado y configurado
2. ✅ PostgreSQL configurado para producción
3. ✅ Archivo `render.yaml` creado (despliegue automático)
4. ✅ Variables de entorno documentadas
5. ✅ Git inicializado y primer commit realizado

---

## 🚀 Pasos que DEBES seguir ahora:

### Paso 1: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Click en el botón "+" arriba a la derecha → "New repository"
3. Configuración del repositorio:

   - **Repository name**: `interior-cms` (o el nombre que prefieras)
   - **Description**: "CMS para landing page de diseño de interiores"
   - **Visibility**: Public o Private (tu elección)
   - ⚠️ **NO marques** "Initialize this repository with a README"
   - Click en "Create repository"

4. Copia la URL del repositorio (algo como: `https://github.com/TU_USUARIO/interior-cms.git`)

### Paso 2: Subir el código a GitHub

Abre la terminal en la carpeta `interior-cms` y ejecuta:

```bash
# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/TU_USUARIO/interior-cms.git

# Subir el código
git push -u origin main
```

Si te pide credenciales:

- Username: tu usuario de GitHub
- Password: usa un **Personal Access Token** (no tu contraseña)
  - Para crear un token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

### Paso 3: Desplegar en Render

#### Opción A: Despliegue Automático (RECOMENDADO) 🌟

1. Ve a [Render](https://render.com) y crea una cuenta (o inicia sesión)
2. En el Dashboard, click en **"New"** → **"Blueprint"**
3. Click en **"Connect GitHub"** y autoriza Render
4. Selecciona el repositorio **`interior-cms`**
5. Render detectará automáticamente el archivo `render.yaml`
6. Click en **"Apply"**
7. Render creará automáticamente:
   - ✅ Base de datos PostgreSQL
   - ✅ Web Service con Strapi
   - ✅ Todas las variables de entorno

#### Opción B: Despliegue Manual

Si prefieres hacerlo paso a paso, sigue las instrucciones del README.md

### Paso 4: Esperar el despliegue

- El primer despliegue tarda **5-10 minutos**
- Puedes ver el progreso en tiempo real en Render
- Cuando termine, verás: ✅ "Live" en verde

### Paso 5: Acceder al panel de administración

1. Render te dará una URL como: `https://interior-cms.onrender.com`
2. Accede a: `https://interior-cms.onrender.com/admin`
3. **Primera vez**: Crea tu usuario administrador
   - Email
   - Nombre
   - Contraseña (¡guárdala bien!)

---

## 🎯 Próximos pasos después del despliegue:

### 1. Crear Content Types (Tipos de contenido)

En el panel admin de Strapi:

1. Ve a **Content-Type Builder** (icono de puzzle)
2. Click en **"Create new collection type"**
3. Ejemplos de content types que podrías crear:

#### **Proyecto** (para tu portfolio)

- Título (Text)
- Descripción (Rich Text)
- Imagen principal (Media)
- Galería (Media - multiple)
- Categoría (Enumeration: Residencial, Comercial, etc.)
- Fecha (Date)

#### **Servicio**

- Nombre (Text)
- Descripción (Rich Text)
- Icono (Media)
- Precio (Number - opcional)

#### **Testimonio**

- Nombre del cliente (Text)
- Comentario (Text)
- Foto (Media - opcional)
- Calificación (Number)

### 2. Configurar permisos de API

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. En cada Content Type que creaste, marca:
   - ✅ `find` (listar todos)
   - ✅ `findOne` (ver uno específico)
3. **NO marques** create, update, delete (solo tú puedes editar desde el admin)
4. Click en **Save**

### 3. Añadir contenido

1. Ve a **Content Manager**
2. Selecciona el Content Type
3. Click en **"Create new entry"**
4. Rellena los campos
5. Click en **"Save"** y luego **"Publish"**

### 4. Configurar CORS (Seguridad)

Edita el archivo `config/middlewares.ts` para permitir solo tu dominio:

```typescript
export default [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://interior-cms.onrender.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://interior-cms.onrender.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: ["https://tu-dominio.com", "http://localhost:5173"], // Añade tus dominios
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  // ... resto de middlewares
];
```

---

## 🔗 Consumir la API desde tu frontend

Una vez que tengas contenido publicado:

```javascript
// Ejemplo: Obtener todos los proyectos
const response = await fetch(
  "https://interior-cms.onrender.com/api/proyectos?populate=*",
);
const data = await response.json();
console.log(data.data); // Array de proyectos

// Ejemplo: Obtener un proyecto específico
const response = await fetch(
  "https://interior-cms.onrender.com/api/proyectos/1?populate=*",
);
const data = await response.json();
console.log(data.data); // Proyecto con ID 1
```

### En tu proyecto de React/Vite:

```typescript
// src/services/cms.ts
const CMS_URL = "https://interior-cms.onrender.com/api";

export async function getProyectos() {
  const response = await fetch(`${CMS_URL}/proyectos?populate=*`);
  const data = await response.json();
  return data.data;
}

export async function getServicios() {
  const response = await fetch(`${CMS_URL}/servicios?populate=*`);
  const data = await response.json();
  return data.data;
}
```

---

## ⚠️ Importante sobre el plan gratuito de Render:

- ✅ **Gratis para siempre**
- ⚠️ **Se duerme después de 15 minutos de inactividad**
- ⚠️ **Tarda ~30 segundos en despertar** cuando alguien accede
- ✅ **750 horas gratis al mes** (suficiente para un sitio personal)

### Solución para que no se duerma:

Usa un servicio como [UptimeRobot](https://uptimerobot.com/) para hacer ping cada 14 minutos.

---

## 📞 ¿Necesitas ayuda?

Si tienes algún problema:

1. Revisa los logs en Render Dashboard
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que la base de datos esté conectada

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tendrás:

- ✅ CMS funcionando en la nube
- ✅ Panel de administración accesible
- ✅ API REST para consumir desde tu frontend
- ✅ Base de datos PostgreSQL
- ✅ Todo gratis

**¡Ahora puedes editar el contenido de tu web desde un panel profesional!** 🚀
