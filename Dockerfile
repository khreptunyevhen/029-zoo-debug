# Build stage
FROM node:16-alpine as build
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
# RUN npm run build

# Production stage
FROM node:16-alpine as production
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the build stage
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the build output from the build stage
COPY --from=build /app .

# Set the environment variable for the port number
ENV PORT=8080

# Expose the port for the application
EXPOSE 8080

# Start the application
CMD ["npm", "start"]