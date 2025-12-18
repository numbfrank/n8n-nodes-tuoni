"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipDescription = void 0;
exports.ipDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['ip'],
            },
        },
        options: [
            {
                name: 'Get All',
                value: 'getAll',
                action: 'Get all IPs',
                description: 'Get all IPs',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/api/v1/ips',
                    },
                },
            },
        ],
        default: 'getAll',
    },
];
//# sourceMappingURL=index.js.map