"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandAliasDescription = void 0;
exports.commandAliasDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['commandAlias'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create a command alias',
                description: 'Create a new command alias',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/command-alias',
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a command alias',
                description: 'Archives a command alias by ID',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/api/v1/command-alias/{{$parameter.aliasId}}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a command alias',
                description: 'Get command alias by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/command-alias/{{$parameter.aliasId}}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many command aliases',
                description: 'Get many command aliases',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/command-alias',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a command alias',
                description: 'Edit an existing command alias',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/api/v1/command-alias/{{$parameter.aliasId}}',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Alias ID',
        name: 'aliasId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['commandAlias'],
                operation: ['get', 'update', 'delete'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the command alias',
    },
    {
        displayName: 'Alias Data',
        name: 'aliasData',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['commandAlias'],
                operation: ['create', 'update'],
            },
        },
        default: '{}',
        description: 'Command alias data',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
];
//# sourceMappingURL=index.js.map