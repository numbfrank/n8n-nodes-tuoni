import type { INodeProperties } from 'n8n-workflow';

export const ipDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ip'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many i ps',
				description: 'Get many IPs',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/ips',
					},
				},
			},
		],
		default: 'getAll',
	},
];
