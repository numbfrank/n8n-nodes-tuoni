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
				//{ name: 'JWT (Login then Bearer)', value: 'jwt' },
				{ name: 'Basic (Username/Password)', value: 'basic' },
			],
			description: 'Choose how to authenticate of API requests',
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
			return { token };
		}
		return {};
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
			const token = String(credentials.token ?? '');
			(next.headers as Record<string, string>).Authorization = token ? `Bearer ${token}` : '';
		}
		return next;
	};

	test: ICredentialTestRequest = {
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
