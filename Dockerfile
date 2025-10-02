# ----------------------
# Stage 1: Build
# ----------------------
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

# Copy deps files
COPY package.json bun.lockb* tsconfig*.json nest-cli.json ./

# Install all dependencies (including dev for build)
RUN bun install

# Copy full source
COPY . .

# Compile NestJS (TypeScript -> dist)
RUN bunx tsc -p tsconfig.build.json


# ----------------------
# Stage 2: Runtime
# ----------------------
FROM oven/bun:1.1.13 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV npm_config_build_from_source=false

# Copy only prod deps
COPY package.json bun.lockb* ./
RUN bun install --production --frozen-lockfile

# Copy built output from builder
COPY --from=builder /app/dist ./dist

# Expose the NestJS port
EXPOSE 8000

# Run NestJS backend
CMD ["bun", "dist/main.js"]
