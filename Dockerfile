FROM oven/bun:1.1.13 AS runner

WORKDIR /app

# Install build tools (tiny overhead but solves gyp issues)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["bun", "run", "dist/main.js"]
