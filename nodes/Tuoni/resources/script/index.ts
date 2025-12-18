import type { INodeProperties } from 'n8n-workflow';

export const scriptDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['script'],
			},
		},
		options: [
			{
				name: 'Get Content',
				value: 'getContent',
				action: 'Get script content',
				description: 'Get current content of a script',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/scripts/content/{{$parameter.scriptPath}}',
					},
				},
			},
			{
				name: 'Get Info',
				value: 'getInfo',
				action: 'Get script info',
				description: 'Get a script by path',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/scripts/info/{{$parameter.scriptPath}}',
					},
				},
			},
			{
				name: 'Get Log Lines',
				value: 'getLogLines',
				action: 'Get log lines',
				description: 'Get specific lines from a script log file',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/scripts/log/lines/{{$parameter.scriptPath}}',
					},
				},
			},
			{
				name: 'Get Log Raw',
				value: 'getLogRaw',
				action: 'Get raw log',
				description: 'Get raw log file for a script',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/scripts/log/raw/{{$parameter.scriptPath}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many scripts',
				description: 'Get many scripts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/scripts',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Script Path',
		name: 'scriptPath',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['getInfo', 'getContent', 'getLogRaw', 'getLogLines'],
			},
		},
		default: '',
		required: true,
		description: 'The path to the script',
	},
	{
		displayName: 'Start Line',
		name: 'startLine',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['getLogLines'],
			},
		},
		default: 0,
		description: 'Starting line number',
		routing: {
			send: {
				type: 'query',
				property: 'start',
			},
		},
	},
	{
		displayName: 'End Line',
		name: 'endLine',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['script'],
				operation: ['getLogLines'],
			},
		},
		default: 100,
		description: 'Ending line number',
		routing: {
			send: {
				type: 'query',
				property: 'end',
			},
		},
	},
];
