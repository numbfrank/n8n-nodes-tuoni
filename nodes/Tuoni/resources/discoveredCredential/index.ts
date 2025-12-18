import type { INodeProperties } from 'n8n-workflow';
export const discoveredCredentialDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['discoveredCredential'],
			},
		},
		options: [
			{
				name: 'Archive Many',
				value: 'archiveMany',
				action: 'Archive credentials',
				description: 'Archive credentials',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/discovery/credentials/bulk-archive',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a credential',
				description: 'Create a new credential',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/discovery/credentials',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a credential',
				description: 'Get credential by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/discovery/credential/{{$parameter.credentialId}}',
					},
				},
			},
			{
				name: 'Get Events',
				value: 'getEvents',
				action: 'Get credential events',
				description: 'Get all events for a credential',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/discovery/credential/{{$parameter.credentialId}}/events',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get credentials',
				description: 'Get credentials by pagination and search criteria',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/discovery/credentials',
					},
				},
			},
			{
				name: 'Restore Many',
				value: 'restoreMany',
				action: 'Restore credentials',
				description: 'Restore credentials',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/discovery/credentials/bulk-restore',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a credential',
				description: 'Update credential',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/discovery/credential/{{$parameter.credentialId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Credential ID',
		name: 'credentialId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['discoveredCredential'],
				operation: ['get', 'update', 'getEvents'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the credential',
	},
	{
		displayName: 'Credential Data',
		name: 'credentialData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['discoveredCredential'],
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		routing: {
			send: {
				type: 'body',
			},
		},
	},
	{
		displayName: 'Credential IDs',
		name: 'credentialIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['discoveredCredential'],
				operation: ['archiveMany', 'restoreMany'],
			},
		},
		default: '[]',
		description: 'Array of credential IDs',
		routing: {
			send: {
				type: 'body',
			},
		},
	},
];
