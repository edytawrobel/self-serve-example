FROM node:20 AS build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# Use Nginx to serve the build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
