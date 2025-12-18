"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDescription = void 0;
exports.eventDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['event'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'Get an event',
                description: 'Get event by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/event/{{$parameter.eventId}}',
                    },
                },
            },
            {
                name: 'Get Full',
                value: 'getFull',
                action: 'Get full event',
                description: 'Get full event details by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/api/v1/event/{{$parameter.eventId}}/full',
                    },
                },
            },
        ],
        default: 'get',
    },
    {
        displayName: 'Event ID',
        name: 'eventId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['event'],
            },
        },
        default: '',
        required: true,
        description: 'The ID of the event',
    },
];
//# sourceMappingURL=index.js.map