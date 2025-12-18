"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubIssuesApi = void 0;
class GithubIssuesApi {
    constructor() {
        this.name = 'githubIssuesApi';
        this.displayName = 'GitHub Issues API';
        this.icon = { light: 'file:../icons/github.svg', dark: 'file:../icons/github.dark.svg' };
        this.documentationUrl = 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#deleting-a-personal-access-token';
        this.properties = [
            {
                displayName: 'Access Token',
                name: 'accessToken',
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=token {{$credentials?.accessToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.github.com',
                url: '/user',
                method: 'GET',
            },
        };
    }
}
exports.GithubIssuesApi = GithubIssuesApi;
//# sourceMappingURL=GithubIssuesApi.credentials.js.map