import type { INodeProperties } from 'n8n-workflow';

export const commandTemplateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['commandTemplate'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many command templates',
				description: 'Get many command templates',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/command-templates',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a command template',
				description: 'Get command template by unique ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/command-templates/{{$parameter.templateId}}',
					},
				},
			},
			{
				name: 'Get Agent Templates',
				value: 'getAgentTemplates',
				action: 'Get agent command templates',
				description: 'Find all available command templates for agent by GUID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/agents/{{$parameter.guid}}/command-templates',
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
				resource: ['commandTemplate'],
				operation: ['get'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the command template',
	},
	{
		displayName: 'Agent GUID',
		name: 'guid',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['commandTemplate'],
				operation: ['getAgentTemplates'],
			},
		},
		default: '',
		required: true,
		description: 'The GUID of the agent',
	},
];
