"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentDescription = void 0;
exports.agentDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['agent'],
            },
        },
        options: [
            {
                name: 'Get All',
                value: 'getAll',
                action: 'Get all agents',
                description: 'Find all agents, both active and inactive',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/agents',
                    },
                },
            },
            {
                name: 'Get All Active',
                value: 'getAllActive',
                action: 'Get all active agents',
                description: 'Find all active agents',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/agents/active',
                    },
                },
            },
            {
                name: 'Get All Inactive',
                value: 'getAllInactive',
                action: 'Get all inactive agents',
                description: 'Find all inactive agents',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/agents/inactive',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get an agent',
                description: 'Find agent by GUID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/agents/{{$parameter.guid}}',
                    },
                },
            },
            {
                name: 'Mark Inactive',
                value: 'markInactive',
                action: 'Mark agent as inactive',
                description: 'Mark agent as inactive by GUID',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/api/v1/agents/{{$parameter.guid}}/inactive',
                    },
                },
            },
            {
                name: 'Update Metadata',
                value: 'updateMetadata',
                action: 'Update agent metadata',
                description: 'Manually modify Agent metadata',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/api/v1/agents/{{$parameter.guid}}/metadata',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Agent GUID',
        name: 'guid',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['agent'],
                operation: ['get', 'markInactive', 'updateMetadata'],
            },
        },
        default: '',
        required: true,
        description: 'The GUID of the agent',
    },
    {
        displayName: 'Metadata',
        name: 'metadata',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['agent'],
                operation: ['updateMetadata'],
            },
        },
        default: '{}',
        description: 'JSON object containing metadata to update',
        routing: {
            send: {
                type: 'body',
                property: 'metadata',
            },
        },
    },
];
//# sourceMappingURL=index.js.map