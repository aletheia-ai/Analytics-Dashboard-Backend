FROM node:18.8.0-alpine AS build

# Install required tools
RUN apk add --no-cache curl unzip

# Download Bun install script and run it with Alpine-compatible sh
RUN curl -fsSL https://bun.sh/install -o install.sh && sh install.sh

# Add Bun to PATH
ENV PATH="/root/.bun/bin:$PATH"

# Set working directory (use absolute path)
WORKDIR /app

# Copy and install dependencies
COPY package.json ./
RUN bun install

# Copy rest of the source code
COPY . .

# Install PM2 globally using Bun
RUN bun add -g pm2

# Set default command to run app using PM2 in cluster mode
CMD ["pm2-runtime", "dist/main.js", "-i", "max"]
