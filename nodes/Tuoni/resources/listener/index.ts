import type { INodeProperties } from 'n8n-workflow';

export const listenerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['listener'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all listeners',
				description: 'Get all listeners',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/listeners',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a listener',
				description: 'Get listener by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/listeners/{{$parameter.listenerId}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a listener',
				description: 'Create a new listener',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/listeners',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a listener',
				description: 'Edit listener, allows changing name and configuration',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/listeners/{{$parameter.listenerId}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a listener',
				description: 'Delete a listener by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/listeners/{{$parameter.listenerId}}',
					},
				},
			},
			{
				name: 'Start',
				value: 'start',
				action: 'Start a listener',
				description: 'Start a listener by ID',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/v1/listeners/{{$parameter.listenerId}}/start',
					},
				},
			},
			{
				name: 'Stop',
				value: 'stop',
				action: 'Stop a listener',
				description: 'Stop a listener by ID',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/v1/listeners/{{$parameter.listenerId}}/stop',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Listener ID',
		name: 'listenerId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['listener'],
				operation: ['get', 'update', 'delete', 'start', 'stop'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the listener',
	},
	{
		displayName: 'Listener Data',
		name: 'listenerData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['listener'],
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		description: 'Listener data including name and configuration',
		routing: {
			send: {
				type: 'body',
			},
		},
	},
];
