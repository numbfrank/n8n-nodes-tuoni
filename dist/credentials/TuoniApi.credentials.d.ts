import type { IAuthenticate, Icon, ICredentialDataDecryptedObject, ICredentialTestRequest, ICredentialType, IDataObject, IHttpRequestHelper, INodeProperties } from 'n8n-workflow';
export declare class TuoniApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: Icon;
    documentationUrl: string;
    properties: INodeProperties[];
    genericAuth: boolean;
    preAuthentication: (this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) => Promise<IDataObject>;
    authenticate: IAuthenticate;
    test: ICredentialTestRequest;
}
