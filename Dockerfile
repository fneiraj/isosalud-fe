FROM node:14-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# SERVING IMAGE
FROM fitiavana07/nginx-react

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'