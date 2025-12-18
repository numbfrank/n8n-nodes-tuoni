"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubIssues = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const issue_1 = require("./resources/issue");
const issueComment_1 = require("./resources/issueComment");
const getRepositories_1 = require("./listSearch/getRepositories");
const getUsers_1 = require("./listSearch/getUsers");
const getIssues_1 = require("./listSearch/getIssues");
class GithubIssues {
    constructor() {
        this.description = {
            displayName: 'GitHub Issues',
            name: 'githubIssues',
            icon: { light: 'file:../../icons/github.svg', dark: 'file:../../icons/github.dark.svg' },
            group: ['input'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Consume issues from the GitHub API',
            defaults: {
                name: 'GitHub Issues',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'githubIssuesApi',
                    required: true,
                    displayOptions: {
                        show: {
                            authentication: ['accessToken'],
                        },
                    },
                },
                {
                    name: 'githubIssuesOAuth2Api',
                    required: true,
                    displayOptions: {
                        show: {
                            authentication: ['oAuth2'],
                        },
                    },
                },
            ],
            requestDefaults: {
                baseURL: 'https://api.github.com',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Authentication',
                    name: 'authentication',
                    type: 'options',
                    options: [
                        {
                            name: 'Access Token',
                            value: 'accessToken',
                        },
                        {
                            name: 'OAuth2',
                            value: 'oAuth2',
                        },
                    ],
                    default: 'accessToken',
                },
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Issue',
                            value: 'issue',
                        },
                        {
                            name: 'Issue Comment',
                            value: 'issueComment',
                        },
                    ],
                    default: 'issue',
                },
                ...issue_1.issueDescription,
                ...issueComment_1.issueCommentDescription,
            ],
        };
        this.methods = {
            listSearch: {
                getRepositories: getRepositories_1.getRepositories,
                getUsers: getUsers_1.getUsers,
                getIssues: getIssues_1.getIssues,
            },
        };
    }
}
exports.GithubIssues = GithubIssues;
//# sourceMappingURL=GithubIssues.node.js.map