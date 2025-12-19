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

export class TuoniJwtApi implements ICredentialType {
	name = 'tuoniJwtApi';

	displayName = 'Tuoni (JWT) API';

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
			typeOptions: { password: true },
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
	};

	authenticate: IAuthenticate = async (
		credentials: ICredentialDataDecryptedObject,
		requestOptions,
	) => {
		const next: typeof requestOptions = { ...requestOptions };
		next.headers = { ...(next.headers ?? {}) };
		next.skipSslCertificateValidation = Boolean(credentials.ignoreSSL);
		
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
			// Regular request - use Bearer token
			const token = String(credentials.token ?? '');
			
			(next.headers as Record<string, string>).Authorization = `Bearer ${token}`;
			delete next.auth;
		}

		return next;
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.serverUrl}}',
			url: '/api/v1/auth/login',
			method: 'POST',
			auth: {
				username: '={{$credentials?.username}}',
				password: '={{$credentials?.password}}',
			},
			headers: {
				Accept: 'text/plain',
			},
			json: false,
			skipSslCertificateValidation: '={{$credentials?.ignoreSSL}}',
		},
	};
}
