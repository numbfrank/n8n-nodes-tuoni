import type { INodeProperties } from 'n8n-workflow';

export const commandAliasDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['commandAlias'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all command aliases',
				description: 'Get all command aliases',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/command-alias',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a command alias',
				description: 'Get command alias by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/command-alias/{{$parameter.aliasId}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a command alias',
				description: 'Create a new command alias',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/command-alias',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a command alias',
				description: 'Edit an existing command alias',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/v1/command-alias/{{$parameter.aliasId}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a command alias',
				description: 'Archives a command alias by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/command-alias/{{$parameter.aliasId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Alias ID',
		name: 'aliasId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['commandAlias'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the command alias',
	},
	{
		displayName: 'Alias Data',
		name: 'aliasData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['commandAlias'],
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		description: 'Command alias data',
		routing: {
			send: {
				type: 'body',
			},
		},
	},
];
