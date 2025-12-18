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
                default: 'basic',
                options: [
                    { name: 'Basic (Username/Password)', value: 'basic' },
                    { name: 'JWT (Requires fresh credential)', value: 'jwt' },
                ],
                description: 'Basic auth is recommended and works for all operations',
            },
            {
                displayName: 'Token',
                name: 'token',
                type: 'hidden',
                default: '',
                description: 'JWT token (automatically populated)',
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
                return { ...credentials, token };
            }
            return credentials;
        };
        this.authenticate = async (credentials, requestOptions) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
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
                const url = next.url || '';
                const isLoginRequest = url.includes('/auth/login');
                if (isLoginRequest) {
                    if (!next.auth) {
                        next.auth = {
                            username: String((_d = credentials.username) !== null && _d !== void 0 ? _d : ''),
                            password: String((_e = credentials.password) !== null && _e !== void 0 ? _e : ''),
                            sendImmediately: true,
                        };
                    }
                }
                else {
                    let token = String((_f = credentials.token) !== null && _f !== void 0 ? _f : '');
                    if (!token) {
                        const axios = require('axios');
                        const response = await axios.post(`${credentials.serverUrl}/api/v1/auth/login`, '', {
                            auth: {
                                username: String((_g = credentials.username) !== null && _g !== void 0 ? _g : ''),
                                password: String((_h = credentials.password) !== null && _h !== void 0 ? _h : ''),
                            },
                            headers: { Accept: 'text/plain' },
                            httpsAgent: credentials.ignoreSSL ? new (require('https').Agent)({ rejectUnauthorized: false }) : undefined,
                        });
                        token = response.data;
                        credentials.token = token;
                    }
                    next.headers.Authorization = `Bearer ${token}`;
                    delete next.auth;
                }
            }
            return next;
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.serverUrl}}',
                url: '={{$credentials.authMode === "basic" ? "/api/v1/agents" : "/api/v1/auth/login"}}',
                method: '={{$credentials.authMode === "basic" ? "GET" : "POST"}}',
                auth: {
                    username: '={{$credentials?.username}}',
                    password: '={{$credentials?.password}}',
                },
                headers: {
                    Accept: '={{$credentials.authMode === "basic" ? "application/json" : "text/plain"}}',
                },
                json: '={{$credentials.authMode === "basic"}}',
                skipSslCertificateValidation: '={{$credentials?.ignoreSSL}}',
            },
        };
    }
}
exports.TuoniApi = TuoniApi;
//# sourceMappingURL=TuoniApi.credentials.js.map