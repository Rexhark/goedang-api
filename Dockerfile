FROM node:20.12.2-alpine3.18 as base
# Production stage
FROM base
ENV NODE_ENV=production
ENV TZ=UTC
ENV HOST=localhost
ENV PORT=8080
ENV LOG_LEVEL=info
ENV APP_KEY=zmi20HiJ3KnQJ1gL77ZXswEvWOy4EWGU
ENV NODE_ENV=development
ENV DB_CONNECTION=goedang-test:asia-southeast2:goedang-db
ENV DB_HOST=34.101.53.222
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD="*?i`ZB.Hit/{%27;"
ENV DB_DATABASE=goedang-db
WORKDIR /app
COPY . ./
EXPOSE 8080
RUN npm install
RUN npm run start