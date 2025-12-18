import type {
	IAuthenticateGeneric,
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
	];

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

		return { token };
	};

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.token ? "Bearer " + $credentials.token : ""}}',
			},
		},
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
