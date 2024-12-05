FROM node:18-bookworm
WORKDIR /app
CMD ["sh", "-c", "ls"]
CMD ["sh", "-c", "npm install"]
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run stage"]
