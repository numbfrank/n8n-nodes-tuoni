import type {
	IAuthenticate,
	Icon,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IDataObject,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class TuoniApi implements ICredentialType {
	name = 'tuoniApi';

	displayName = 'Tuoni API';

	icon: Icon = { light: 'file:../icons/tuoni.svg', dark: 'file:../icons/tuoni.dark.svg' };

	documentationUrl = 'https://docs.shelldot.com/REST/API/authentication.html';

	properties: INodeProperties[] = [
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
				{ name: 'JWT (Login then Bearer)', value: 'jwt' },
				{ name: 'Basic (Username/Password)', value: 'basic' },
			],
			description: 'Choose how to authenticate of API requests',
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'hidden',
			default: '',
			description: 'JWT token (automatically populated)',
		},
	];

	// Enable generic auth handling so credentials hook applies to requests
	genericAuth = true;

	preAuthentication = async function (
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
	): Promise<IDataObject> {
		if (credentials.authMode === 'jwt') {
			const token = (await this.helpers.httpRequest({
				baseURL: credentials.serverUrl as string,
				url: '/api/v1/auth/login',
				method: 'POST',
				auth: {
					username: String(credentials.username ?? ''),
					password: String(credentials.password ?? ''),
				},
				headers: {
					Accept: 'text/plain',
				},
				json: false,
				skipSslCertificateValidation: Boolean(credentials.ignoreSSL),
			})) as string;
			// Return all credentials with token merged
			return { ...credentials, token };
		}
		return credentials;
	};

	authenticate: IAuthenticate = async (
		credentials: ICredentialDataDecryptedObject,
		requestOptions,
	) => {
		const next: typeof requestOptions = { ...requestOptions };
		next.headers = { ...(next.headers ?? {}) };
		next.skipSslCertificateValidation = Boolean(credentials.ignoreSSL);
		
		if (credentials.authMode === 'basic') {
			next.auth = {
				username: String(credentials.username ?? ''),
				password: String(credentials.password ?? ''),
				sendImmediately: true,
			};
			delete (next.headers as Record<string, string>)['Authorization'];
		} else {
			// JWT mode
			const url = next.url || '';
			const isLoginRequest = url.includes('/auth/login');
			
			if (isLoginRequest) {
				// Login request - keep Basic auth
				if (!next.auth) {
					next.auth = {
						username: String(credentials.username ?? ''),
						password: String(credentials.password ?? ''),
						sendImmediately: true,
					};
				}
			} else {
				// Regular request - use Bearer token, fetch if missing
				let token = String(credentials.token ?? '');
				
				if (!token) {
					// Token missing - fetch it now
					const axios = require('axios');
					const response = await axios.post(
						`${credentials.serverUrl}/api/v1/auth/login`,
						{},
						{
							auth: {
								username: String(credentials.username ?? ''),
								password: String(credentials.password ?? ''),
							},
							headers: { Accept: 'text/plain' },
							httpsAgent: credentials.ignoreSSL ? new (require('https').Agent)({ rejectUnauthorized: false }) : undefined,
						}
					);
					token = response.data;
					credentials.token = token;
				}
				
				(next.headers as Record<string, string>).Authorization = `Bearer ${token}`;
				delete next.auth;
			}
		}
		return next;
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.serverUrl}}',
			url: '={{$credentials.authMode === "basic" ? "/api/v1/agents" : "/api/v1/auth/login"}}',
			method: '={{$credentials.authMode === "basic" ? "GET" : "POST"}}' as any,
			auth: {
				username: '={{$credentials?.username}}',
				password: '={{$credentials?.password}}',
			},
			headers: {
				Accept: '={{$credentials.authMode === "basic" ? "application/json" : "text/plain"}}',
			},
			json: '={{$credentials.authMode === "basic"}}' as any,
			skipSslCertificateValidation: '={{$credentials?.ignoreSSL}}',
		},
	};
}
