# Use Nginx as the base image to serve static files
FROM nginx:stable-alpine

# Copy the static website files to Nginx's default directory
COPY . /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
