"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubIssuesOAuth2Api = void 0;
class GithubIssuesOAuth2Api {
    constructor() {
        this.name = 'githubIssuesOAuth2Api';
        this.extends = ['oAuth2Api'];
        this.displayName = 'GitHub Issues OAuth2 API';
        this.icon = { light: 'file:../icons/github.svg', dark: 'file:../icons/github.dark.svg' };
        this.documentationUrl = 'https://docs.github.com/en/apps/oauth-apps';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'authorizationCode',
            },
            {
                displayName: 'Authorization URL',
                name: 'authUrl',
                type: 'hidden',
                default: 'https://github.com/login/oauth/authorize',
                required: true,
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                type: 'hidden',
                default: 'https://github.com/login/oauth/access_token',
                required: true,
            },
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'hidden',
                default: 'repo',
            },
            {
                displayName: 'Auth URI Query Parameters',
                name: 'authQueryParameters',
                type: 'hidden',
                default: '',
            },
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'hidden',
                default: 'header',
            },
        ];
    }
}
exports.GithubIssuesOAuth2Api = GithubIssuesOAuth2Api;
//# sourceMappingURL=GithubIssuesOAuth2Api.credentials.js.map