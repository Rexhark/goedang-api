FROM node:20.12.2-alpine3.18 as base
# Production stage
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy app source code
COPY . .

# Build app
RUN npm run build --production

COPY ./.env ./build

# Expose port
EXPOSE 8080

# Start app
CMD ["node", "./build/server.js"]
