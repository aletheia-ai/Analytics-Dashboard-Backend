# ----------------------
# Stage 1: Build
# ----------------------
    FROM oven/bun:1.1.13 AS builder

    WORKDIR /app
    
    # Copy lockfile and package.json first for dependency caching
    COPY package.json bun.lockb* ./
    
    # Install all dependencies (including dev)
    RUN bun install
    
    # Copy source code
    COPY . ./
    
    # Build the project (NestJS compiles TypeScript -> dist)
    RUN bun run build
    
    
    # ----------------------
    # Stage 2: Runtime
    # ----------------------
    FROM oven/bun:1.1.13 AS runner
    
    WORKDIR /app
    
    # Copy only required runtime files
    COPY package.json bun.lockb* ./
    RUN bun install --production
    
    # Copy built dist from builder stage
    COPY --from=builder /app/dist ./dist
    
    # Expose the NestJS port
    EXPOSE 8000
    
    # Run NestJS build output
    CMD ["bun", "dist/main.js"]
    