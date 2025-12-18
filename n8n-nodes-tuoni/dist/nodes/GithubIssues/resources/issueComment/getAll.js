"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueCommentGetManyDescription = void 0;
const utils_1 = require("../../shared/utils");
const showOnlyForIssueCommentGetMany = {
    operation: ['getAll'],
    resource: ['issueComment'],
};
exports.issueCommentGetManyDescription = [
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                ...showOnlyForIssueCommentGetMany,
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
            show: showOnlyForIssueCommentGetMany,
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
];
//# sourceMappingURL=getAll.js.map