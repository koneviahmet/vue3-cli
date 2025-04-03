FROM alpine:latest

# Install necessary tools
RUN apk add --no-cache unzip ca-certificates

# Set working directory
WORKDIR /app

# Download and unzip PocketBase
ARG PB_VERSION=0.20.7
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    && unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
    && rm pocketbase_${PB_VERSION}_linux_amd64.zip

# Create a directory for the PocketBase data
RUN mkdir -p /pb_data

# Expose the default PocketBase port
EXPOSE 8090

# Run PocketBase
CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"] 