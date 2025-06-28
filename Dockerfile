FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Add user for better security
RUN addgroup -g 1001 nextjs \
  && adduser -u 1001 -G nextjs -S nextjs

# Download PocketBase for Linux
RUN apk add --no-cache wget unzip \
  && wget -O /tmp/pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v0.28.4/pocketbase_0.28.4_linux_amd64.zip \
  && unzip /tmp/pocketbase.zip -d /tmp/ \
  && mv /tmp/pocketbase /app/pocketbase \
  && chmod +x /app/pocketbase \
  && rm /tmp/pocketbase.zip
  
RUN mkdir -p /app/pb_data && chown -R nextjs:nextjs /app/pb_data

# Copy app files
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nextjs .next
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000 8090
ENV PORT=3000

# Start both PocketBase and Next.js server
CMD ["sh", "-c", "/app/pocketbase serve --http=0.0.0.0:8090 & node server.js"]

