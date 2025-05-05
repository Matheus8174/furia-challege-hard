# Use a base image with Node.js and build tools pre-installed
FROM node:22.14

# Install dependencies required for canvas (including pkg-config and build tools)
RUN apt-get update && apt-get install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
  pkg-config \
  && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Install global dependencies like npm (in case they're missing from the image)
RUN npm install -g npm@latest

# Copy package.json and package-lock.json to the container (to avoid re-installing dependencies every time)
COPY package*.json ./

# Install your dependencies (including face-api.js, canvas, and tensorflow)
RUN npm install

# Expose the port (if you're running a server inside the container)
EXPOSE 8080

# Mount the volume to reflect your workspace
# This will map your local directory to /app inside the container
VOLUME ["/app"]

# Command to start your app (replace with the actual start command if different)
CMD ["npx", "tsx", "--watch", "src"]
