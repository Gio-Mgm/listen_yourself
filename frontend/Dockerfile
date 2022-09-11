# Load nodeJS image
FROM node:18-alpine3.14
# Set working directory
WORKDIR /frontend
# Copy file with required packages
COPY package*.json ./
# Install required packages
RUN npm install
# Copy local folder into the working directory
COPY . .
# Run React server (development only)
CMD [ "npm", "start" ]
# Expose port to localhost
EXPOSE 8080