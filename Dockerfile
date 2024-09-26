# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the built application with nginx
FROM nginx:alpine

# Copy the built React app from the build stage to the nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration (optional, if you need to customize nginx behavior)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
