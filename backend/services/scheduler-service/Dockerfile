# ---- Build stage ----
FROM node:22-slim AS builder
WORKDIR /backend

# copy root workspace files first (better layer caching)
COPY package.json package-lock.json ./
COPY services/scheduler-service/package.json services/scheduler-service/
COPY packages/shared/package.json packages/shared/

RUN npm install

# now copy actual source
COPY packages/shared packages/shared
COPY services/scheduler-service services/scheduler-service

RUN npm run build --workspace=@myeventscheduler/shared
RUN npm run build --workspace=scheduler-service

# ---- Runtime stage ----
FROM node:22-slim

WORKDIR /backend

COPY --from=builder /backend/package.json ./
COPY --from=builder /backend/packages/shared/ ./packages/shared/
COPY --from=builder /backend/services/scheduler-service/package.json ./scheduler-service/package.json
COPY --from=builder /backend/services/scheduler-service/dist ./scheduler-service/dist
COPY --from=builder /backend/services/scheduler-service/src/migrations ./scheduler-service/src/migrations
COPY --from=builder /backend/services/scheduler-service/src/config ./scheduler-service/src/config

COPY --from=builder /backend/node_modules ./node_modules

EXPOSE 9001

CMD ["sh", "-c", "npx sequelize-cli db:migrate --config scheduler-service/src/config/database.js --migrations-path scheduler-service/src/migrations && node scheduler-service/dist/index.js"]