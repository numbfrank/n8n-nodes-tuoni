# Tuoni Community Node for n8n

This n8n community node integrates with a Tuoni C2 server, enabling you to automate common C2 operations in your workflows: manage agents, run commands, control listeners/payloads, handle files, react to events, and administer users/settings.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
- [Usage](#usage)
- [Compatibility](#compatibility)
- [Resources](#resources)

## Installation

Follow the official guide for community nodes: https://docs.n8n.io/integrations/community-nodes/installation/

Once installed, search for the node named “Tuoni” in the n8n editor.

## Credentials

Create a new credential of type “Tuoni API” in n8n:

- Server URL: Base URL to your Tuoni instance (for example, `https://tuoni.example.com`).
- Username: Your Tuoni username.
- Password: Your Tuoni password.

The node will authenticate against Tuoni and send an `Authorization: Bearer <token>` header. A built-in test request verifies access via `/api/v1/users/me`.

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

## Usage

1. Add the “Tuoni” node to a workflow and select your “Tuoni API” credential.
2. Choose a Resource, then an Operation (for example, Commands → Create).
3. Fill in required parameters (for example, agent GUID, command type, arguments).
4. Execute the workflow to interact with the Tuoni server.

Example scenarios:
- Orchestrate command execution across active agents and monitor results.
- Start a listener and generate a payload template, then download artifacts.
- Collect discovered hosts/services and bulk-archive resolved findings.
- Automate user administration and settings changes across environments.

## Compatibility

Tested with n8n 1.60.0 and later. Community nodes generally follow n8n’s minor version compatibility, but please pin versions as needed in your environment.

## Resources

- n8n community nodes documentation: https://docs.n8n.io/integrations/#community-nodes
- Tuoni server/API documentation: refer to your Tuoni deployment’s documentation or API reference.
