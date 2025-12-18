import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { agentDescription } from './resources/agent';
import { commandDescription } from './resources/command';
import { commandTemplateDescription } from './resources/session';
import { commandAliasDescription } from './resources/commandAlias';
import { discoveredCredentialDescription } from './resources/discoveredCredential';
import { discoveredHostDescription } from './resources/discoveredHost';
import { discoveredServiceDescription } from './resources/discoveredService';
import { listenerDescription } from './resources/listener';
import { payloadDescription, payloadTemplateDescription } from './resources/payload';
import { jobDescription } from './resources/job';
import { userDescription } from './resources/user';
import { eventDescription } from './resources/event';
import { fileStorageDescription } from './resources/fileStorage';
import { settingDescription } from './resources/setting';
import { scriptDescription } from './resources/script';
import { pluginDescription } from './resources/plugin';
import { ipDescription } from './resources/ip';

export class Tuoni implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tuoni',
		name: 'tuoni',
		icon: { light: 'file:../../icons/tuoni.svg', dark: 'file:../../icons/tuoni.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Tuoni server',
		defaults: {
			name: 'Tuoni',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tuoniApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.serverUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Command',
						value: 'command',
					},
					{
						name: 'Command Alias',
						value: 'commandAlias',
					},
					{
						name: 'Command Template',
						value: 'commandTemplate',
					},
					{
						name: 'Discovered Credential',
						value: 'discoveredCredential',
					},
					{
						name: 'Discovered Host',
						value: 'discoveredHost',
					},
					{
						name: 'Discovered Service',
						value: 'discoveredService',
					},
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'File Storage',
						value: 'fileStorage',
					},
					{
						name: 'Job',
						value: 'job',
					},
					{
						name: 'Listener',
						value: 'listener',
					},
					{
						name: 'Payload',
						value: 'payload',
					},
					{
						name: 'Payload Template',
						value: 'payloadTemplate',
					},
					{
						name: 'Plugin',
						value: 'plugin',
					},
					{
						name: 'IP',
						value: 'ip',
					},
					{
						name: 'Script',
						value: 'script',
					},
					{
						name: 'Setting',
						value: 'setting',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'agent',
			},
			...agentDescription,
			...commandDescription,
			...commandTemplateDescription,
			...commandAliasDescription,
			...discoveredCredentialDescription,
			...discoveredHostDescription,
			...discoveredServiceDescription,
			...eventDescription,
			...fileStorageDescription,
			...jobDescription,
			...listenerDescription,
			...payloadDescription,
			...payloadTemplateDescription,
			...pluginDescription,
			...ipDescription,
			...scriptDescription,
			...settingDescription,
			...userDescription,
		],
	};
}
