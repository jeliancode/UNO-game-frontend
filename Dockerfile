# 1. Usa una imagen de Node.js para construir la app
FROM node:22-alpine AS build

# 2. Define el directorio de trabajo
WORKDIR /app

# 3. Copia los archivos del proyecto al contenedor
COPY package.json package-lock.json ./
RUN npm install

# 4. Copia el resto del código
COPY . .

# 5. Construye la aplicación
RUN npm run build

# 6. Usa una imagen de Nginx para servir el frontend
FROM nginx:alpine

# 7. Copia los archivos de build al contenedor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 8. Expone el puerto 80
EXPOSE 80

# 9. Arranca el servidor de Nginx
CMD ["nginx", "-g", "daemon off;"]
