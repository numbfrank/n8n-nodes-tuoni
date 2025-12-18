"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoveredServiceDescription = void 0;
exports.discoveredServiceDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['discoveredService'],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get services',
                description: 'Get services by pagination and search criteria',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/discovery/services',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a service',
                description: 'Get service by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/discovery/service/{{$parameter.serviceId}}',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a service',
                description: 'Create a new service',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/discovery/services',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a service',
                description: 'Edit service note, banner or protocol',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/api/v1/discovery/service/{{$parameter.serviceId}}',
                    },
                },
            },
            {
                name: 'Get Events',
                value: 'getEvents',
                action: 'Get service events',
                description: 'Get all create and edit events for a service',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/discovery/service/{{$parameter.serviceId}}/events',
                    },
                },
            },
            {
                name: 'Archive Many',
                value: 'archiveMany',
                action: 'Archive services',
                description: 'Archive services',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/discovery/services/bulk-archive',
                    },
                },
            },
            {
                name: 'Restore Many',
                value: 'restoreMany',
                action: 'Restore services',
                description: 'Restore services',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/discovery/services/bulk-restore',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Service ID',
        name: 'serviceId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['discoveredService'],
                operation: ['get', 'update', 'getEvents'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the service',
    },
    {
        displayName: 'Service Data',
        name: 'serviceData',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['discoveredService'],
                operation: ['create', 'update'],
            },
        },
        default: '{}',
        description: 'Service data',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
    {
        displayName: 'Service IDs',
        name: 'serviceIds',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['discoveredService'],
                operation: ['archiveMany', 'restoreMany'],
            },
        },
        default: '[]',
        description: 'Array of service IDs',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
];
//# sourceMappingURL=index.js.map