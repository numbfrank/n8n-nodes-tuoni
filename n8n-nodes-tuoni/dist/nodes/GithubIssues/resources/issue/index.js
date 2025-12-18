"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueDescription = void 0;
const descriptions_1 = require("../../shared/descriptions");
const getAll_1 = require("./getAll");
const get_1 = require("./get");
const create_1 = require("./create");
const showOnlyForIssues = {
    resource: ['issue'],
};
exports.issueDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForIssues,
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get issues in a repository',
                description: 'Get many issues in a repository',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get an issue',
                description: 'Get the data of a single issue',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a new issue',
                description: 'Create a new issue',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        ...descriptions_1.repoOwnerSelect,
        displayOptions: {
            show: showOnlyForIssues,
        },
    },
    {
        ...descriptions_1.repoNameSelect,
        displayOptions: {
            show: showOnlyForIssues,
        },
    },
    ...getAll_1.issueGetManyDescription,
    ...get_1.issueGetDescription,
    ...create_1.issueCreateDescription,
];
//# sourceMappingURL=index.js.map