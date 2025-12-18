"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueGetManyDescription = void 0;
const utils_1 = require("../../shared/utils");
const showOnlyForIssueGetMany = {
    operation: ['getAll'],
    resource: ['issue'],
};
exports.issueGetManyDescription = [
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                ...showOnlyForIssueGetMany,
                returnAll: [false],
            },
        },
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        default: 50,
        routing: {
            send: {
                type: 'query',
                property: 'per_page',
            },
            output: {
                maxResults: '={{$value}}',
            },
        },
        description: 'Max number of results to return',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: showOnlyForIssueGetMany,
        },
        default: false,
        description: 'Whether to return all results or only up to a given limit',
        routing: {
            send: {
                paginate: '={{ $value }}',
                type: 'query',
                property: 'per_page',
                value: '100',
            },
            operations: {
                pagination: {
                    type: 'generic',
                    properties: {
                        continue: `={{ !!(${utils_1.parseLinkHeader.toString()})($response.headers?.link).next }}`,
                        request: {
                            url: `={{ (${utils_1.parseLinkHeader.toString()})($response.headers?.link)?.next ?? $request.url }}`,
                        },
                    },
                },
            },
        },
    },
    {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        typeOptions: {
            multipleValueButtonText: 'Add Filter',
        },
        displayOptions: {
            show: showOnlyForIssueGetMany,
        },
        default: {},
        options: [
            {
                displayName: 'Updated Since',
                name: 'since',
                type: 'dateTime',
                default: '',
                description: 'Return only issues updated at or after this time',
                routing: {
                    request: {
                        qs: {
                            since: '={{$value}}',
                        },
                    },
                },
            },
            {
                displayName: 'State',
                name: 'state',
                type: 'options',
                options: [
                    {
                        name: 'All',
                        value: 'all',
                        description: 'Returns issues with any state',
                    },
                    {
                        name: 'Closed',
                        value: 'closed',
                        description: 'Return issues with "closed" state',
                    },
                    {
                        name: 'Open',
                        value: 'open',
                        description: 'Return issues with "open" state',
                    },
                ],
                default: 'open',
                description: 'The issue state to filter on',
                routing: {
                    request: {
                        qs: {
                            state: '={{$value}}',
                        },
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=getAll.js.map