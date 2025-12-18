"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueCommentDescription = void 0;
const descriptions_1 = require("../../shared/descriptions");
const getAll_1 = require("./getAll");
const showOnlyForIssueComments = {
    resource: ['issueComment'],
};
exports.issueCommentDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForIssueComments,
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get issue comments',
                description: 'Get issue comments',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/comments',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        ...descriptions_1.repoOwnerSelect,
        displayOptions: {
            show: showOnlyForIssueComments,
        },
    },
    {
        ...descriptions_1.repoNameSelect,
        displayOptions: {
            show: showOnlyForIssueComments,
        },
    },
    ...getAll_1.issueCommentGetManyDescription,
];
//# sourceMappingURL=index.js.map