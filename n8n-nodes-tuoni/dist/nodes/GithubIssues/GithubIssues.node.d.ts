import { type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { getRepositories } from './listSearch/getRepositories';
import { getUsers } from './listSearch/getUsers';
import { getIssues } from './listSearch/getIssues';
export declare class GithubIssues implements INodeType {
    description: INodeTypeDescription;
    methods: {
        listSearch: {
            getRepositories: typeof getRepositories;
            getUsers: typeof getUsers;
            getIssues: typeof getIssues;
        };
    };
}
