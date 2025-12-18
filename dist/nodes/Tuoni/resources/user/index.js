"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDescription = void 0;
exports.userDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['user'],
            },
        },
        options: [
            {
                name: 'Change Own Password',
                value: 'changeOwnPassword',
                action: 'Change own password',
                description: 'Change current user password',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '/api/v1/users/me/password',
                    },
                },
            },
            {
                name: 'Change Password',
                value: 'changePassword',
                action: 'Change user password',
                description: 'Change user password by username',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/api/v1/users/{{$parameter.username}}/password',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a user',
                description: 'Create a new user',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/users',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a user',
                description: 'Get user by username',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/users/{{$parameter.username}}',
                    },
                },
            },
            {
                name: 'Get Current User',
                value: 'getCurrentUser',
                action: 'Get current user',
                description: 'Get current user information',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/users/me',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many users',
                description: 'Get many users',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/users',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a user',
                description: 'Update user information',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/api/v1/users/{{$parameter.username}}',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Username',
        name: 'username',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['user'],
                operation: ['get', 'update', 'changePassword'],
            },
        },
        default: '',
        required: true,
    },
    {
        displayName: 'User Data',
        name: 'userData',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['user'],
                operation: ['create', 'update'],
            },
        },
        default: '{}',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
    {
        displayName: 'Password',
        name: 'password',
        type: 'string',
        typeOptions: { password: true },
        displayOptions: {
            show: {
                resource: ['user'],
                operation: ['changePassword', 'changeOwnPassword'],
            },
        },
        default: '',
        required: true,
        description: 'The new password',
        routing: {
            send: {
                type: 'body',
                property: 'password',
            },
        },
    },
];
//# sourceMappingURL=index.js.map