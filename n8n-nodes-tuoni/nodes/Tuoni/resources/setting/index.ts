import type { INodeProperties } from 'n8n-workflow';

export const settingDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['setting'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all settings',
				description: 'Get all Tuoni settings',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/settings',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a setting',
				description: 'Get setting by key',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/setting/{{$parameter.settingKey}}',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a setting',
				description: 'Update setting by key',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/v1/setting/{{$parameter.settingKey}}',
					},
				},
			},
			{
				name: 'Update Many',
				value: 'updateMany',
				action: 'Update settings',
				description: 'Update multiple Tuoni settings',
				routing: {
					request: {
						method: 'PATCH',
						url: '/api/v1/settings',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Setting Key',
		name: 'settingKey',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['setting'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The key of the setting',
	},
	{
		displayName: 'Setting Value',
		name: 'settingValue',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['setting'],
				operation: ['update'],
			},
		},
		default: '',
		required: true,
		description: 'The value of the setting',
		routing: {
			send: {
				type: 'body',
				property: 'value',
			},
		},
	},
	{
		displayName: 'Settings Data',
		name: 'settingsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['setting'],
				operation: ['updateMany'],
			},
		},
		default: '{}',
		description: 'Settings data as JSON object',
		routing: {
			send: {
				type: 'body',
			},
		},
	},
];
