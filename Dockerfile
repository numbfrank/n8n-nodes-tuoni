FROM n8nio/n8n:latest

USER root

# Install the Tuoni node
COPY --chown=node:node . /tmp/n8n-nodes-tuoni

WORKDIR /tmp/n8n-nodes-tuoni

# Install dependencies and build
RUN npm install && \
    npm run build && \
    npm link

# Link to n8n's custom nodes directory
WORKDIR /home/node/.n8n
RUN mkdir -p custom && \
    cd custom && \
    npm link n8n-nodes-tuoni

# Switch back to node user
USER node

WORKDIR /home/node

# Expose n8n port
EXPOSE 5678

CMD ["n8n"]
