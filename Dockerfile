# ---------- BUILDER ----------
  FROM node:22-alpine AS builder

  # Enable pnpm
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  # Set workdir
  WORKDIR /app
  
  # Copy lockfile and package.json first
  COPY package.json pnpm-lock.yaml ./
  
  # Install all deps (including devDependencies)
  RUN pnpm install
  
  # Copy the rest of the source code
  COPY . .
  
  # Generate Prisma client
  RUN npx prisma generate
  
  # Build TypeScript
  RUN pnpm build
  
  
  # ---------- RUNTIME ----------
  FROM node:22-alpine AS runner
  
  # Enable pnpm
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  # Set workdir
  WORKDIR /app
  
  # Copy only necessary files
  COPY package.json pnpm-lock.yaml ./
  
  # Install only production deps (ignore husky)
  RUN pnpm install --prod --ignore-scripts
  
  # Copy built output and prisma client
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/prisma ./prisma

  
  # Set env variable
  ENV NODE_ENV=production
  
  # Expose port
  EXPOSE 3000
  
  # Run the app
  CMD ["node", "dist/main.js"]
  