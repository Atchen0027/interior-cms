# Interior CMS - Strapi

CMS para gestionar el contenido de la landing page de diseño de interiores.

## 🚀 Despliegue en Render

### Opción 1: Despliegue automático con render.yaml

1. **Sube el proyecto a GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/interior-cms.git
   git push -u origin main
   ```

2. **Conecta con Render**

   - Ve a [Render Dashboard](https://dashboard.render.com/)
   - Click en "New" → "Blueprint"
   - Conecta tu repositorio de GitHub
   - Render detectará automáticamente el archivo `render.yaml`
   - Click en "Apply" para crear el servicio y la base de datos

3. **Espera el despliegue**

   - Render creará automáticamente:
     - Base de datos PostgreSQL
     - Web Service con Strapi
     - Todas las variables de entorno necesarias

4. **Accede al panel de administración**
   - URL: `https://interior-cms.onrender.com/admin`
   - Crea tu primer usuario administrador

### Opción 2: Despliegue manual

1. **Crea la base de datos PostgreSQL**

   - En Render Dashboard → "New" → "PostgreSQL"
   - Nombre: `interior-cms-db`
   - Plan: Free
   - Copia la "Internal Database URL"

2. **Crea el Web Service**

   - En Render Dashboard → "New" → "Web Service"
   - Conecta tu repositorio
   - Configuración:
     - **Name**: interior-cms
     - **Environment**: Node
     - **Region**: Oregon (o el más cercano)
     - **Branch**: main
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run start`
     - **Plan**: Free

3. **Configura las variables de entorno**

   En la sección "Environment Variables", añade:

   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=[Pega aquí la Internal Database URL]
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   APP_KEYS=[Genera un string aleatorio largo]
   API_TOKEN_SALT=[Genera un string aleatorio largo]
   ADMIN_JWT_SECRET=[Genera un string aleatorio largo]
   TRANSFER_TOKEN_SALT=[Genera un string aleatorio largo]
   JWT_SECRET=[Genera un string aleatorio largo]
   ```

   Para generar strings aleatorios seguros, usa:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. **Despliega**
   - Click en "Create Web Service"
   - Espera a que termine el build (5-10 minutos)

## 🔧 Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run develop

# Acceder al panel admin
# http://localhost:1337/admin
```

## 📝 Uso

Una vez desplegado:

1. Accede a `/admin` y crea tu usuario administrador
2. Crea los "Content Types" necesarios (Proyectos, Servicios, etc.)
3. Añade contenido desde el panel
4. Consume la API desde tu frontend:
   ```javascript
   // Ejemplo
   const response = await fetch(
     "https://interior-cms.onrender.com/api/proyectos",
   );
   const data = await response.json();
   ```

## 🔐 Seguridad

- Cambia todas las claves secretas en producción
- Configura CORS en `config/middlewares.ts` para permitir solo tu dominio
- Configura los permisos de API en Settings → Users & Permissions Plugin

## 📚 Documentación

- [Strapi Documentation](https://docs.strapi.io)
- [Render Documentation](https://render.com/docs)
