"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubApiRequest = githubApiRequest;
async function githubApiRequest(method, resource, qs = {}, body = undefined) {
    const authenticationMethod = this.getNodeParameter('authentication', 0);
    const options = {
        method: method,
        qs,
        body,
        url: `https://api.github.com${resource}`,
        json: true,
    };
    const credentialType = authenticationMethod === 'accessToken' ? 'githubIssuesApi' : 'githubIssuesOAuth2Api';
    return this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
}
//# sourceMappingURL=transport.js.map