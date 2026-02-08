#!/bin/bash

# Script para subir los Content Types a producción

echo "📦 Preparando para subir cambios a Render..."

# 1. Detener Strapi local
echo "⏸️  Detén Strapi local (Ctrl+C en la terminal)"
echo ""

# 2. Hacer commit de los cambios
echo "📝 Ejecuta estos comandos:"
echo ""
echo "cd /Users/acen0027/Desktop/Web/interior-cms"
echo "git add ."
echo "git commit -m 'Add content types: proyecto, servicio, testimonio'"
echo "git push origin main"
echo ""

# 3. Render desplegará automáticamente
echo "🚀 Render detectará los cambios y desplegará automáticamente"
echo "⏱️  Espera 5-10 minutos para que termine el despliegue"
echo ""

# 4. Verificar
echo "✅ Luego verifica en: https://interior-cms.onrender.com/admin"
