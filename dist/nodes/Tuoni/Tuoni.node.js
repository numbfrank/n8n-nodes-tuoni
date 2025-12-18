"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tuoni = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const agent_1 = require("./resources/agent");
const commandAlias_1 = require("./resources/commandAlias");
const command_1 = require("./resources/command");
const session_1 = require("./resources/session");
const discoveredCredential_1 = require("./resources/discoveredCredential");
const discoveredHost_1 = require("./resources/discoveredHost");
const discoveredService_1 = require("./resources/discoveredService");
const event_1 = require("./resources/event");
const fileStorage_1 = require("./resources/fileStorage");
const ip_1 = require("./resources/ip");
const job_1 = require("./resources/job");
const listener_1 = require("./resources/listener");
const payload_1 = require("./resources/payload");
const plugin_1 = require("./resources/plugin");
const script_1 = require("./resources/script");
const setting_1 = require("./resources/setting");
const user_1 = require("./resources/user");
class Tuoni {
    constructor() {
        this.description = {
            displayName: 'Tuoni',
            name: 'tuoni',
            icon: { light: 'file:../../icons/tuoni.svg', dark: 'file:../../icons/tuoni.dark.svg' },
            group: ['input'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with Tuoni server',
            defaults: {
                name: 'Tuoni',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'tuoniApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: '={{$credentials.serverUrl}}',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Agent',
                            value: 'agent',
                        },
                        {
                            name: 'Command',
                            value: 'command',
                        },
                        {
                            name: 'Command Alias',
                            value: 'commandAlias',
                        },
                        {
                            name: 'Command Template',
                            value: 'commandTemplate',
                        },
                        {
                            name: 'Discovered Credential',
                            value: 'discoveredCredential',
                        },
                        {
                            name: 'Discovered Host',
                            value: 'discoveredHost',
                        },
                        {
                            name: 'Discovered Service',
                            value: 'discoveredService',
                        },
                        {
                            name: 'Event',
                            value: 'event',
                        },
                        {
                            name: 'File Storage',
                            value: 'fileStorage',
                        },
                        {
                            name: 'IP',
                            value: 'ip',
                        },
                        {
                            name: 'Job',
                            value: 'job',
                        },
                        {
                            name: 'Listener',
                            value: 'listener',
                        },
                        {
                            name: 'Payload',
                            value: 'payload',
                        },
                        {
                            name: 'Payload Template',
                            value: 'payloadTemplate',
                        },
                        {
                            name: 'Plugin',
                            value: 'plugin',
                        },
                        {
                            name: 'Script',
                            value: 'script',
                        },
                        {
                            name: 'Setting',
                            value: 'setting',
                        },
                        {
                            name: 'User',
                            value: 'user',
                        },
                    ],
                    default: 'agent',
                },
                ...agent_1.agentDescription,
                ...command_1.commandDescription,
                ...session_1.commandTemplateDescription,
                ...commandAlias_1.commandAliasDescription,
                ...discoveredCredential_1.discoveredCredentialDescription,
                ...discoveredHost_1.discoveredHostDescription,
                ...discoveredService_1.discoveredServiceDescription,
                ...event_1.eventDescription,
                ...fileStorage_1.fileStorageDescription,
                ...job_1.jobDescription,
                ...listener_1.listenerDescription,
                ...payload_1.payloadDescription,
                ...payload_1.payloadTemplateDescription,
                ...plugin_1.pluginDescription,
                ...ip_1.ipDescription,
                ...script_1.scriptDescription,
                ...setting_1.settingDescription,
                ...user_1.userDescription,
            ],
        };
    }
}
exports.Tuoni = Tuoni;
//# sourceMappingURL=Tuoni.node.js.map