# ----------------------
# Stage 1: Build
# ----------------------
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

# Copy lockfile and package.json first
COPY package.json bun.lockb* ./

# Install all dependencies (dev included, for build tools)
RUN bun install

# Copy source code
COPY . .

# Build the project (NestJS compiles TypeScript -> dist)
RUN bun run build


# ----------------------
# Stage 2: Runtime
# ----------------------
FROM oven/bun:1.1.13 AS runner

WORKDIR /app

# Copy only required files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the NestJS port
EXPOSE 8000

# Set environment
ENV NODE_ENV=production

# Run NestJS build output
CMD ["bun", "run", "dist/main.js"]
