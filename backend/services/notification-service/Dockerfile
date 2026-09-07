# ---- Build stage ----
FROM node:22-slim AS builder
WORKDIR /backend

# copy root workspace files first (better layer caching)
COPY package.json package-lock.json ./
COPY services/notification-service/package.json services/notification-service/
COPY packages/shared/package.json packages/shared/


RUN npm install

# now copy actual source
COPY packages/shared packages/shared
RUN npm run build  --workspace=@myeventscheduler/shared
COPY services/notification-service services/notification-service

RUN npm run build --no-cache --workspace=notification-service

# ---- Runtime stage ----
FROM node:22-slim
WORKDIR /backend
COPY --from=builder /backend/package.json ./
COPY --from=builder /backend/packages/shared/ ./packages/shared/
COPY --from=builder /backend/services/notification-service/dist ./dist
COPY --from=builder /backend/node_modules ./node_modules
# ... plus whatever package.json is needed for runtime

EXPOSE 9002
CMD ["node", "dist/notification/server.js"]