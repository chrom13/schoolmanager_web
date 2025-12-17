#!/bin/bash

# Script de instalación para School Manager Frontend
# Este script limpia las dependencias antiguas e instala las nuevas versiones

echo "🧹 Limpiando dependencias antiguas..."
rm -rf node_modules package-lock.json

echo "📦 Instalando nuevas dependencias..."
npm install

echo ""
echo "✅ Instalación completada!"
echo ""
echo "Para iniciar el proyecto ejecuta:"
echo "  npm run dev"
echo ""
echo "El proyecto estará disponible en: http://localhost:5173"
