<div align="center">

<img src="docs/images/tuoni.svg" width="120" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="docs/images/plus.svg" width="60" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="docs/images/n8n.svg" width="120" />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/n8n-nodes-tuoni)](https://www.npmjs.com/package/n8n-nodes-tuoni)
[![n8n](https://img.shields.io/badge/n8n-%3E%3D2.0.0-blue)](https://n8n.io)
[![Beta](https://img.shields.io/badge/Status-Beta-orange)](https://github.com/numbfrank/n8n-nodes-tuoni)

</div>
<br>

# Tuoni Community Node for n8n

> **⚠️ BETA SOFTWARE**: This package is currently in beta. While functional, you may encounter issues or missing features. Please [open an issue](https://github.com/numbfrank/n8n-nodes-tuoni/issues) if you find any bugs or have feature requests. Contributions are welcome!

This n8n community node integrates with [Tuoni](https://github.com/shell-dot/tuoni), a penetration testing command and control framework. Automate common C2 operations in your n8n workflows: manage agents, run commands, control listeners/payloads, handle files, react to events, and administer users/settings.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [What is Tuoni?](#what-is-tuoni)
- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Compatibility](#compatibility)
- [Contributing](#contributing)
- [License](#license)
- [Resources](#resources)

## What is Tuoni?

[Tuoni](https://github.com/shell-dot/tuoni) is a modern, modular command and control (C2) framework designed for penetration testing and red team operations. It provides:

- **Agent Management**: Deploy and control agents on target systems
- **Command Execution**: Run commands and scripts on compromised hosts
- **Listener/Payload Generation**: Create and manage listeners and payloads
- **Discovery**: Enumerate hosts, services, and credentials
- **Plugin Architecture**: Extend functionality with custom plugins

This n8n node allows you to automate Tuoni operations, integrate with other tools, and build complex security workflows.

## Installation

### Install from npm (Recommended)

Install the package in your n8n custom nodes directory:

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Install the package
npm install n8n-nodes-tuoni
```

Then restart n8n to load the new node.

### Quick Start with Docker 🐳

The fastest way to get started:

```bash
# Clone the repository
git clone https://github.com/numbfrank/n8n-nodes-tuoni.git
cd n8n-nodes-tuoni

# Start n8n with the Tuoni node pre-installed
docker compose up -d
```

n8n will be available at `http://localhost:5678`

**Default credentials:** admin / changeme (set via `.env` file or environment variables)

#### Environment Variables

Create a `.env` file or set these environment variables to customize your setup:

| Variable                  | Description                          | Default    |
| ------------------------- | ------------------------------------ | ---------- |
| `N8N_BASIC_AUTH_USER`     | n8n admin username                   | `admin`    |
| `N8N_BASIC_AUTH_PASSWORD` | n8n admin password                   | `changeme` |
| `N8N_SECURE_COOKIE`       | Set to `false` for local HTTP access | `true`     |
| `N8N_PORT`                | Port for n8n web interface           | `5678`     |
| `GENERIC_TIMEZONE`        | Timezone for n8n                     | `UTC`      |

### Development Installation

For contributing or local development:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/numbfrank/n8n-nodes-tuoni.git
   cd n8n-nodes-tuoni
   ```

2. **Install dependencies and build:**

   ```bash
   npm install
   npm run build
   ```

3. **Link the package to your n8n installation:**

   ```bash
   # Create a symbolic link
   npm link

   # In your n8n custom nodes directory
   cd ~/.n8n/custom
   npm link n8n-nodes-tuoni
   ```

4. **Restart n8n** to load the new node.

5. Once installed, search for the node named "Tuoni" in the n8n editor.

For more details, see the [official community nodes guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Credentials

Create a new credential of type "Tuoni API - JWT Authentication API" in n8n:

- **Server URL**: Base URL to your Tuoni instance (e.g., `https://localhost:8443` or `https://tuoni.example.com:8443`)
- **Username**: Your Tuoni username
- **Password**: Your Tuoni password
- **Ignore SSL Issues**: Enable this for self-signed certificates (common in local/test environments)

The credential uses JWT authentication - it automatically obtains a token from your Tuoni server when needed and includes it with all API requests. The token is cached and refreshed automatically when expired.

The credential includes a built-in test that validates connectivity to your Tuoni server by performing a login and querying the agents endpoint.

## Operations

This node exposes multiple resource categories. Each category includes common CRUD and control actions aligned with Tuoni’s REST API.

- Agents: list/get, active/inactive filters, mark inactive, update metadata.
- Commands: list/get, create for an agent, stop, update.
- Command Templates & Aliases: list/get, create/update/delete, fetch agent templates.
- Discovery (Credentials, Hosts, Services): list/get, create/update, events, bulk archive/restore.
- Events: get event summaries and full details.
- Files (Storage): list/get, by path, download/upload, update, delete.
- Jobs: list/all vs. active, get by id, pause/resume/restart.
- Listeners: create/update/delete, start/stop.
- Payloads & Payload Templates: list/get, create/update/delete, download.
- Plugins: list/get per type (command/listener/payload), enable/disable command plugins.
- Scripts: list/get info/content, fetch raw logs or log lines (with query params).
- Settings: list/get, update one or many settings.
- Users: list/get/me, create/update, change password (self or admin).
- IPs: list known IPs.

<div align="center">

![Available Resources and Actions](docs/images/ActionsMenu.png)

</div>

## Usage

1. Add the "Tuoni" node to a workflow and select your "Tuoni API - JWT Authentication API" credential.
2. Choose a **Resource** (e.g., Agent, Command, Listener), then an **Operation** (e.g., Get All, Create, Update).
3. Fill in required parameters based on the operation.
4. Execute the workflow to interact with the Tuoni server.

<div align="center">

![Listener Operations Example](docs/images/GetListeners.png)

</div>

### Example Workflows

**Automated Command Execution:**

- Use **Agent → Get All** to list active agents
- For each agent, use **Command → Create** to execute commands
- Use **Command → Get** to check command status and retrieve results

**Listener & Payload Management:**

- **Listener → Create** to start a new listener
- **Payload Template → Create** to define a payload configuration
- **Payload → Create** to generate the payload binary
- **Payload → Download** to retrieve the generated artifact

**Discovery & Threat Hunting:**

- **Discovered Host → Get All** to enumerate discovered hosts
- **Discovered Service → Get All** to list services per host
- **Discovered Credential → Get All** to review harvested credentials
- **Event → Get All** to track discovery events and timeline

**Administration:**

- **User → Create** and **User → Update** for user management
- **Setting → Update Multiple** for bulk configuration changes
- **Script → Get Logs** to monitor script execution and debugging

<div align="center">

![Example Workflow: Automated Operations](docs/images/Example.png)

</div>

## Troubleshooting

### SSL Certificate Errors

**Error:** `DEPTH_ZERO_SELF_SIGNED_CERT` or `self-signed certificate`

**Solution:** Enable "Ignore SSL Issues" in your Tuoni credential settings. This is common when using self-signed certificates in development or internal environments.

### 401 Unauthorized Errors

**Error:** `401 Unauthorized` when executing node operations

**Solutions:**

- Verify your username and password are correct
- Test your credentials using the "Test" button in the credential editor
- Ensure the Tuoni server is running and accessible
- Check that your user account has the necessary permissions

### Connection Refused

**Error:** `ECONNREFUSED` or `Connection refused`

**Solutions:**

- Verify the Server URL is correct (including port, typically 8443)
- Ensure the Tuoni server is running
- Check firewall rules allow traffic from n8n to the Tuoni server
- If using Docker, ensure network connectivity between containers

### Token Expiration

JWT tokens are automatically refreshed when they expire. If you encounter persistent authentication issues, try:

1. Delete and recreate the credential
2. Verify the Tuoni server's clock is synchronized

## Compatibility

Tested with n8n 2.0.0 and later. Community nodes generally follow n8n's minor version compatibility, but please pin versions as needed in your environment.

**Requirements:**

- n8n >= 2.0.0
- Tuoni with REST API enabled (typically running on port 8443)
- Network access from your n8n instance to the Tuoni server

## Contributing

Contributions are welcome! This is a community-maintained project.

- **Bug Reports**: [Open an issue](https://github.com/numbfrank/n8n-nodes-tuoni/issues) with details about the problem
- **Feature Requests**: Submit an issue describing your use case and proposed enhancement
- **Pull Requests**: Fork the repository, create a feature branch, and submit a PR

Before submitting code:

```bash
npm run lint        # Check for linting errors
npm run build       # Ensure the package builds successfully
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Tuoni](https://github.com/shell-dot/tuoni)
- [Tuoni Documentation](https://docs.shelldot.com/)
- [Tuoni API Documentation](https://docs.shelldot.com/REST/API/api.html)
- [Report Issues](https://github.com/numbfrank/n8n-nodes-tuoni/issues)
