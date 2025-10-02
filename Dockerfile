# ----------------------
# Stage 1: Build
# ----------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install build tools for native modules (bcrypt, msgpackr, etc.)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies (including dev)
RUN npm install

# Copy source code
COPY . .

# Build NestJS (TypeScript -> dist)
RUN npm run build


# ----------------------
# Stage 2: Runtime
# ----------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Only copy package files
COPY package*.json ./

# Install only production deps
RUN npm install --omit=dev

# Copy built code from builder
COPY --from=builder /app/dist ./dist

# Expose app port
EXPOSE 8000

# Run NestJS
CMD ["node", "dist/main.js"]
