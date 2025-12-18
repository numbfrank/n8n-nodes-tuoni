import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
export declare function getUsers(this: ILoadOptionsFunctions, filter?: string, paginationToken?: string): Promise<INodeListSearchResult>;
