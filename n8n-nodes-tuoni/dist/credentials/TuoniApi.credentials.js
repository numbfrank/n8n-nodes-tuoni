"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuoniApi = void 0;
class TuoniApi {
    constructor() {
        this.name = 'tuoniApi';
        this.displayName = 'Tuoni API';
        this.icon = { light: 'file:../icons/tuoni.svg', dark: 'file:../icons/tuoni.dark.svg' };
        this.documentationUrl = 'https://github.com/tuoni/tuoni';
        this.properties = [
            {
                displayName: 'Server URL',
                name: 'serverUrl',
                type: 'string',
                default: 'https://localhost:8443',
                placeholder: 'https://localhost:8443',
                description: 'The URL of your Tuoni server',
            },
            {
                displayName: 'Username',
                name: 'username',
                type: 'string',
                default: '',
                description: 'Username for Tuoni authentication',
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                description: 'Password for Tuoni authentication',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '={{$response.body.token ? "Bearer " + $response.body.token : ""}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.serverUrl}}',
                url: '/api/v1/users/me',
                method: 'GET',
            },
        };
    }
}
exports.TuoniApi = TuoniApi;
//# sourceMappingURL=TuoniApi.credentials.js.map