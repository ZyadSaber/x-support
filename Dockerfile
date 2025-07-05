# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Clean npm cache and then install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application's source code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]