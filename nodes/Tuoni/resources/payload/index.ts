import type { INodeProperties } from 'n8n-workflow';

export const payloadDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payload'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a payload',
				description: 'Create payload',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/payloads',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a payload',
				description: 'Archives a payload by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/payloads/{{$parameter.payloadId}}',
					},
				},
			},
			{
				name: 'Download',
				value: 'download',
				action: 'Download a payload',
				description: 'Download payload',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/payloads/{{$parameter.payloadId}}/download',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a payload',
				description: 'Get payload by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/payloads/{{$parameter.payloadId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many payloads',
				description: 'Get many payloads',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/payloads',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Payload ID',
		name: 'payloadId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['payload'],
				operation: ['get', 'delete', 'download'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the payload',
	},
	{
		displayName: 'Payload Data',
		name: 'payloadData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['payload'],
				operation: ['create'],
			},
		},
		default: '{}',
		routing: {
			send: {
				type: 'body',
			},
		},
	},
];

export const payloadTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payloadTemplate'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many payload templates',
				description: 'Get many payload templates',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/payloads/templates',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a payload template',
				description: 'Get payload template by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/payloads/templates/{{$parameter.templateId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['payloadTemplate'],
				operation: ['get'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the payload template',
	},
];
