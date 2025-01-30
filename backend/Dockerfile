# Use Node.js official image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend/ .

# Expose the backend application port
EXPOSE 3000

# Command to run the backend application
CMD ["node", "server.js"]
