import type { IHookFunctions, IExecuteFunctions, IExecuteSingleFunctions, ILoadOptionsFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
export declare function githubApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, resource: string, qs?: IDataObject, body?: IDataObject | undefined): Promise<any>;
