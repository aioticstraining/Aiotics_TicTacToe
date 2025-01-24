# Use an official lightweight web server image
FROM nginx:alpine

# Copy the Tic Tac Toe application files to the web server's directory
COPY . /usr/share/nginx/html

# Expose port 80 to access the application
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
