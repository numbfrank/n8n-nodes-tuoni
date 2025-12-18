"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStorageDescription = void 0;
exports.fileStorageDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['fileStorage'],
            },
        },
        options: [
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a file',
                description: 'Delete file by ID',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/api/v1/file/{{$parameter.fileId}}',
                    },
                },
            },
            {
                name: 'Download',
                value: 'download',
                action: 'Download a file',
                description: 'Download file by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/file/{{$parameter.fileId}}/download',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a file',
                description: 'Get file by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/file/{{$parameter.fileId}}',
                    },
                },
            },
            {
                name: 'Get By Path',
                value: 'getByPath',
                action: 'Get file by path',
                description: 'Get file by path',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/file/by-path/{{$parameter.filePath}}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many files',
                description: 'Get many files',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/files',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a file',
                description: 'Update file by ID',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/api/v1/file/{{$parameter.fileId}}',
                    },
                },
            },
            {
                name: 'Upload',
                value: 'upload',
                action: 'Upload a file',
                description: 'Upload file',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/api/v1/files',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'File ID',
        name: 'fileId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['fileStorage'],
                operation: ['get', 'download', 'update', 'delete'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the file',
    },
    {
        displayName: 'File Path',
        name: 'filePath',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['fileStorage'],
                operation: ['getByPath'],
            },
        },
        default: '',
        required: true,
        description: 'The path to the file',
    },
    {
        displayName: 'File Data',
        name: 'fileData',
        type: 'json',
        displayOptions: {
            show: {
                resource: ['fileStorage'],
                operation: ['upload', 'update'],
            },
        },
        default: '{}',
        routing: {
            send: {
                type: 'body',
            },
        },
    },
];
//# sourceMappingURL=index.js.map