import type {
	Icon,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export class TuoniJwtApi implements ICredentialType {
	name = 'tuoniJwtApi';

	displayName = 'Tuoni API - JWT Authentication API';

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

	// preAuthentication runs when token is empty or expired
	// It fetches a fresh JWT token from the Tuoni server
	async preAuthentication(
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
	) {
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

		return { token };
	}

	// authenticate injects the token and SSL settings into every request
	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const token = String(credentials.token ?? '');

		return {
			...requestOptions,
			headers: {
				...requestOptions.headers,
				Authorization: `Bearer ${token}`,
			},
			skipSslCertificateValidation: Boolean(credentials.ignoreSSL),
		};
	}

	test: ICredentialTestRequest = {
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
