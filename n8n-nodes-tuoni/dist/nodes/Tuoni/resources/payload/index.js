"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadTemplateDescription = exports.payloadDescription = void 0;
exports.payloadDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['payload'],
            },
        },
        options: [
            {
                name: 'Get All',
                value: 'getAll',
                action: 'Get all payloads',
                description: 'Get all payloads',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/payloads',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a payload',
                description: 'Get payload by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/payloads/{{$parameter.payloadId}}',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a payload',
                description: 'Create payload',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/payloads',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a payload',
                description: 'Archives a payload by ID',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/api/v1/payloads/{{$parameter.payloadId}}',
                    },
                },
            },
            {
                name: 'Download',
                value: 'download',
                action: 'Download a payload',
                description: 'Download payload',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/payloads/{{$parameter.payloadId}}/download',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Payload ID',
        name: 'payloadId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['payload'],
                operation: ['get', 'delete', 'download'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the payload',
    },
    {
        displayName: 'Payload Data',
        name: 'payloadData',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['payload'],
                operation: ['create'],
            },
        },
        default: '{}',
        description: 'Payload data',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
];
exports.payloadTemplateDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['payloadTemplate'],
            },
        },
        options: [
            {
                name: 'Get All',
                value: 'getAll',
                action: 'Get all payload templates',
                description: 'Get all payload templates',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/payloads/templates',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a payload template',
                description: 'Get payload template by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/payloads/templates/{{$parameter.templateId}}',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Template ID',
        name: 'templateId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['payloadTemplate'],
                operation: ['get'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the payload template',
    },
];
//# sourceMappingURL=index.js.map