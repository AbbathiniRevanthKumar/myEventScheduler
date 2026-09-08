# ---- Build stage ----
FROM node:22-slim AS builder
WORKDIR /backend

# copy root workspace files first (better layer caching)
COPY package.json package-lock.json ./
COPY services/worker-service/package.json services/worker-service/
COPY packages/shared/package.json packages/shared/

RUN npm install

# now copy actual source
COPY packages/shared packages/shared
COPY services/worker-service services/worker-service

RUN npm run build --workspace=@myeventscheduler/shared
RUN npm run build --workspace=worker-service

# ---- Runtime stage ----
FROM node:22-slim
WORKDIR /backend
COPY --from=builder /backend/package.json ./
COPY --from=builder /backend/packages/shared/ ./packages/shared/
COPY --from=builder /backend/services/worker-service/dist ./dist
COPY --from=builder /backend/node_modules ./node_modules
# ... plus whatever package.json is needed for runtime

EXPOSE 9003
CMD ["node", "dist/index.js"]