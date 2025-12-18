"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoveredHostDescription = void 0;
exports.discoveredHostDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['discoveredHost'],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get hosts',
                description: 'Get hosts by pagination and search criteria',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/discovery/hosts',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a host',
                description: 'Get host by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/discovery/host/{{$parameter.hostId}}',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a host',
                description: 'Create a new host',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/discovery/hosts',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a host',
                description: 'Edit host note or name',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/api/v1/discovery/host/{{$parameter.hostId}}',
                    },
                },
            },
            {
                name: 'Get Events',
                value: 'getEvents',
                action: 'Get host events',
                description: 'Get all events for a host',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/discovery/host/{{$parameter.hostId}}/events',
                    },
                },
            },
            {
                name: 'Archive Many',
                value: 'archiveMany',
                action: 'Archive hosts',
                description: 'Archive hosts',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/discovery/hosts/bulk-archive',
                    },
                },
            },
            {
                name: 'Restore Many',
                value: 'restoreMany',
                action: 'Restore hosts',
                description: 'Restore hosts',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/discovery/hosts/bulk-restore',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Host ID',
        name: 'hostId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['discoveredHost'],
                operation: ['get', 'update', 'getEvents'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the host',
    },
    {
        displayName: 'Host Data',
        name: 'hostData',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['discoveredHost'],
                operation: ['create', 'update'],
            },
        },
        default: '{}',
        description: 'Host data',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
    {
        displayName: 'Host IDs',
        name: 'hostIds',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['discoveredHost'],
                operation: ['archiveMany', 'restoreMany'],
            },
        },
        default: '[]',
        description: 'Array of host IDs',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
];
//# sourceMappingURL=index.js.map