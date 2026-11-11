FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / { try_files $uri $uri/ /index.html; }\n  location /api/ {\n    proxy_pass http://backend:8000;\n    proxy_set_header Host $host;\n    client_max_body_size 100M;\n  }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
