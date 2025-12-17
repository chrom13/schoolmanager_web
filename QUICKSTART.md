# 🚀 Quick Start - School Manager Frontend

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Instalar Dependencias

```bash
chmod +x install.sh
./install.sh
```

**O manualmente:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2️⃣ Iniciar el Proyecto

```bash
npm run dev
```

### 3️⃣ Abrir en el Navegador

Abre [http://localhost:3000](http://localhost:3000)

---

## 🎯 Lo que Verás

### Página de Login
- Email y contraseña
- Validación en tiempo real
- Integración con el backend

### Página de Registro
- Formulario completo para onboarding de escuelas
- Validación de RFC, slug, etc.
- Creación automática de usuario director

### Dashboard
- Métricas de la escuela
- Navegación por roles
- Layout moderno basado en el template AKKHOR

---

## 🔧 Configuración del Backend

Asegúrate de que tu API Laravel esté corriendo en:
```
http://localhost:8080/api/v1
```

Si usas otro puerto, edita [.env.development](.env.development):
```env
VITE_API_URL=http://localhost:TU_PUERTO/api/v1
```

---

## 📚 Documentación

- **[README.md](README.md)** - Documentación completa del proyecto
- **[ACTUALIZACION.md](ACTUALIZACION.md)** - Detalles de las dependencias actualizadas
- **[docs/FRONTEND_SETUP.md](docs/FRONTEND_SETUP.md)** - Guía técnica de la implementación
- **[docs/frontend-definition.md](docs/frontend-definition.md)** - Definición original del frontend

---

## ✅ Checklist Antes de Empezar

- [ ] Node.js instalado (v18 o superior)
- [ ] npm instalado
- [ ] Backend Laravel corriendo en puerto 8080
- [ ] Backend con CORS habilitado para localhost:3000
- [ ] Dependencias instaladas (`npm install`)

---

## 🐛 Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: 401 Unauthorized
- Verifica que el backend esté corriendo
- Verifica la URL en `.env.development`

### Error: CORS
El backend debe aceptar requests de `http://localhost:3000`

---

## 🎨 Credenciales de Prueba

Para probar el login, crea un usuario en tu backend o usa el registro para crear una escuela nueva.

---

## 📞 Siguiente Paso

Una vez que el proyecto esté corriendo sin errores, podemos continuar con:

**FASE 2: Gestión de Estructura Académica**
- CRUD de Niveles
- CRUD de Grados
- CRUD de Grupos
- CRUD de Materias

---

**¡Listo para comenzar!** 🎉
