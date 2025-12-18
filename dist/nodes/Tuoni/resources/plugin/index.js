"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginDescription = void 0;
exports.pluginDescription = [
    {
        displayName: 'Plugin Type',
        name: 'pluginType',
        type: 'options',
        displayOptions: {
            show: {
                resource: ['plugin'],
            },
        },
        options: [
            {
                name: 'Command',
                value: 'command',
            },
            {
                name: 'Listener',
                value: 'listener',
            },
            {
                name: 'Payload',
                value: 'payload',
            },
        ],
        default: 'command',
        description: 'Type of plugin',
    },
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['plugin'],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many plugins',
                description: 'Get many plugins of specified type',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/api/v1/plugins/" + $parameter.pluginType + "s"}}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a plugin',
                description: 'Get plugin by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/api/v1/plugins/" + $parameter.pluginType + "s/" + $parameter.pluginId}}',
                    },
                },
            },
            {
                name: 'Enable',
                value: 'enable',
                action: 'Enable a plugin',
                description: 'Enable plugin (command plugins only)',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '={{"/api/v1/plugins/commands/" + $parameter.pluginId + "/enable"}}',
                    },
                },
            },
            {
                name: 'Disable',
                value: 'disable',
                action: 'Disable a plugin',
                description: 'Disable plugin (command plugins only)',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '={{"/api/v1/plugins/commands/" + $parameter.pluginId + "/disable"}}',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Plugin ID',
        name: 'pluginId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['plugin'],
                operation: ['get', 'enable', 'disable'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the plugin',
    },
];
//# sourceMappingURL=index.js.map