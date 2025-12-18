"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandDescription = void 0;
exports.commandDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['command'],
            },
        },
        options: [
            {
                name: 'Get All',
                value: 'getAll',
                action: 'Get all commands',
                description: 'Get all commands',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/commands',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a command',
                description: 'Get command by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/commands/{{$parameter.commandId}}',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a command',
                description: 'Create and queue new command for sending to agent',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/api/v1/agents/{{$parameter.guid}}/commands',
                    },
                },
            },
            {
                name: 'Stop',
                value: 'stop',
                action: 'Stop a command',
                description: 'Sends stop signal to a command identified by ID',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/api/v1/commands/{{$parameter.commandId}}/stop',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a command',
                description: 'Create a update with new data for a command identified by ID',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/api/v1/commands/{{$parameter.commandId}}/update',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Command ID',
        name: 'commandId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['command'],
                operation: ['get', 'stop', 'update'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the command',
    },
    {
        displayName: 'Agent GUID',
        name: 'guid',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['command'],
                operation: ['create'],
            },
        },
        default: '',
        required: true,
        description: 'The GUID of the agent',
    },
    {
        displayName: 'Command Data',
        name: 'commandData',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['command'],
                operation: ['create', 'update'],
            },
        },
        default: '{}',
        description: 'Command data/payload',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
];
//# sourceMappingURL=index.js.map