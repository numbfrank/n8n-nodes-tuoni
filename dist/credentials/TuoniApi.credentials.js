"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuoniApi = void 0;
const buffer_1 = require("buffer");
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
        ];
        this.preAuthentication = async function (credentials) {
            const token = (await this.helpers.httpRequest({
                baseURL: credentials.serverUrl,
                url: '/api/v1/auth/login',
                method: 'POST',
                headers: {
                    Authorization: `Basic ${buffer_1.Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
                    Accept: 'text/plain',
                },
                json: false,
                skipSslCertificateValidation: Boolean(credentials.ignoreSSL),
            }));
            return { token };
        };
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '={{$credentials.token ? "Bearer " + $credentials.token : ""}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.serverUrl}}',
                url: '/api/v1/auth/login',
                method: 'POST',
                headers: {
                    Authorization: '={{"Basic " + Buffer.from($credentials?.username + ":" + $credentials?.password).toString("base64")}}',
                    Accept: 'text/plain',
                },
                json: false,
                skipSslCertificateValidation: '={{$credentials?.ignoreSSL}}',
            },
        };
    }
}
exports.TuoniApi = TuoniApi;
//# sourceMappingURL=TuoniApi.credentials.js.map