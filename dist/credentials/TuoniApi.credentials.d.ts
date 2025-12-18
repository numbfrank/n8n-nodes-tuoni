import type { IAuthenticateGeneric, Icon, ICredentialDataDecryptedObject, ICredentialTestRequest, ICredentialType, IDataObject, IHttpRequestHelper, INodeProperties } from 'n8n-workflow';
export declare class TuoniApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: Icon;
    documentationUrl: string;
    properties: INodeProperties[];
    preAuthentication: (this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) => Promise<IDataObject>;
    authenticate: IAuthenticateGeneric;
    test: ICredentialTestRequest;
}
