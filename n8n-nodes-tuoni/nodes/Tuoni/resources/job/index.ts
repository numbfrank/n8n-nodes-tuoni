import type { INodeProperties } from 'n8n-workflow';

export const jobDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['job'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all jobs',
				description: 'Get all jobs',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/jobs/all',
					},
				},
			},
			{
				name: 'Get Active',
				value: 'getActive',
				action: 'Get active jobs',
				description: 'Get active jobs',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/jobs/active',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a job',
				description: 'Get job by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/job/{{$parameter.jobId}}',
					},
				},
			},
			{
				name: 'Pause',
				value: 'pause',
				action: 'Pause a job',
				description: 'Pause job by ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/job/{{$parameter.jobId}}/pause',
					},
				},
			},
			{
				name: 'Resume',
				value: 'resume',
				action: 'Resume a job',
				description: 'Resume job by ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/job/{{$parameter.jobId}}/resume',
					},
				},
			},
			{
				name: 'Restart',
				value: 'restart',
				action: 'Restart a job',
				description: 'Restart job by ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/job/{{$parameter.jobId}}/restart',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['get', 'pause', 'resume', 'restart'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the job',
	},
];
