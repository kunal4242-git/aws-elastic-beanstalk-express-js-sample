# 1. Base image
FROM node:16

# 2. Working directory
WORKDIR /app

# 3. Copy package files
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy application source
COPY app.js ./
COPY test/ ./test/

# 6. Expose application port
EXPOSE 8080

# 7. Start command
CMD ["npm", "start"]
