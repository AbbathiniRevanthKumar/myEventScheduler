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
COPY --from=builder /backend/services/scheduler-service/dist ./dist
COPY --from=builder /backend/node_modules ./node_modules
# ... plus whatever package.json is needed for runtime

EXPOSE 9001
CMD ["node", "dist/index.js"]