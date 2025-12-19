import type {
	IAuthenticate,
	Icon,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TuoniBasicApi implements ICredentialType {
	name = 'tuoniBasicApi';

	displayName = 'Tuoni (Basic Auth) API';

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
	];

	// Enable generic auth handling so credentials hook applies to requests
	genericAuth = true;

	authenticate: IAuthenticate = async (
		credentials: ICredentialDataDecryptedObject,
		requestOptions,
	) => {
		const next: typeof requestOptions = { ...requestOptions };
		next.headers = { ...(next.headers ?? {}) };
		next.skipSslCertificateValidation = Boolean(credentials.ignoreSSL);
		
		next.auth = {
			username: String(credentials.username ?? ''),
			password: String(credentials.password ?? ''),
			sendImmediately: true,
		};
		delete (next.headers as Record<string, string>)['Authorization'];

		return next;
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.serverUrl}}',
			url: '/api/v1/agents',
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
