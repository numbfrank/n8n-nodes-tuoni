"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuoniApi = void 0;
class TuoniApi {
    constructor() {
        this.name = 'tuoniApi';
        this.displayName = 'Tuoni API';
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
                displayName: 'Authentication Method',
                name: 'authMode',
                type: 'options',
                default: 'jwt',
                options: [
                    { name: 'Basic (Username/Password)', value: 'basic' },
                ],
                description: 'Choose how to authenticate of API requests',
            },
        ];
        this.genericAuth = true;
        this.preAuthentication = async function (credentials) {
            var _a, _b;
            if (credentials.authMode === 'jwt') {
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
            return {};
        };
        this.authenticate = async (credentials, requestOptions) => {
            var _a, _b, _c, _d;
            const next = { ...requestOptions };
            next.headers = { ...((_a = next.headers) !== null && _a !== void 0 ? _a : {}) };
            next.skipSslCertificateValidation = Boolean(credentials.ignoreSSL);
            if (credentials.authMode === 'basic') {
                next.auth = {
                    username: String((_b = credentials.username) !== null && _b !== void 0 ? _b : ''),
                    password: String((_c = credentials.password) !== null && _c !== void 0 ? _c : ''),
                    sendImmediately: true,
                };
                delete next.headers['Authorization'];
            }
            else {
                const token = String((_d = credentials.token) !== null && _d !== void 0 ? _d : '');
                next.headers.Authorization = token ? `Bearer ${token}` : '';
            }
            return next;
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.serverUrl}}',
                url: '={{$credentials.authMode === "basic" ? "/api/v1/agents" : "/api/v1/auth/login"}}',
                method: 'GET',
                auth: {
                    username: '={{$credentials?.username}}',
                    password: '={{$credentials?.password}}',
                },
                headers: {
                    Accept: 'application/json',
                },
                json: true,
                skipSslCertificateValidation: '={{$credentials?.ignoreSSL}}',
            },
        };
    }
}
exports.TuoniApi = TuoniApi;
//# sourceMappingURL=TuoniApi.credentials.js.map