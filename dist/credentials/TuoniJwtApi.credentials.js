"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuoniJwtApi = void 0;
class TuoniJwtApi {
    constructor() {
        this.name = 'tuoniJwtApi';
        this.displayName = 'Tuoni API - JWT Authentication API';
        this.icon = { light: 'file:../icons/tuoni.svg', dark: 'file:../icons/tuoni.dark.svg' };
        this.documentationUrl = 'https://docs.shelldot.com/REST/API/authentication.html';
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
            {
                displayName: 'Ignore SSL Issues',
                name: 'ignoreSSL',
                type: 'boolean',
                default: false,
                description: 'Ignore SSL certificate verification issues (for self-signed certificates)',
            },
            {
                displayName: 'Token',
                name: 'token',
                type: 'hidden',
                typeOptions: {
                    expirable: true,
                    password: true,
                },
                default: '',
            },
        ];
        this.test = {
            request: {
                baseURL: '={{$credentials?.serverUrl}}',
                url: '/api/v1/agents',
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
                json: true,
                skipSslCertificateValidation: '={{$credentials?.ignoreSSL}}',
            },
        };
    }
    async preAuthentication(credentials) {
        var _a, _b;
        const token = (await this.helpers.httpRequest({
            baseURL: credentials.serverUrl,
            url: '/api/v1/auth/login',
            method: 'POST',
            auth: {
                username: String((_a = credentials.username) !== null && _a !== void 0 ? _a : ''),
                password: String((_b = credentials.password) !== null && _b !== void 0 ? _b : ''),
            },
            headers: {
                Accept: 'text/plain',
            },
            json: false,
            skipSslCertificateValidation: Boolean(credentials.ignoreSSL),
        }));
        return { token };
    }
    async authenticate(credentials, requestOptions) {
        var _a;
        const token = String((_a = credentials.token) !== null && _a !== void 0 ? _a : '');
        return {
            ...requestOptions,
            headers: {
                ...requestOptions.headers,
                Authorization: `Bearer ${token}`,
            },
            skipSslCertificateValidation: Boolean(credentials.ignoreSSL),
        };
    }
}
exports.TuoniJwtApi = TuoniJwtApi;
//# sourceMappingURL=TuoniJwtApi.credentials.js.map