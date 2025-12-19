import type { IAuthenticate, Icon, ICredentialDataDecryptedObject, ICredentialTestRequest, ICredentialType, IDataObject, IHttpRequestHelper, INodeProperties } from 'n8n-workflow';
export declare class TuoniJwtApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: Icon;
    documentationUrl: string;
    properties: INodeProperties[];
    preAuthentication: (this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) => Promise<IDataObject>;
    authenticate: IAuthenticate;
    test: ICredentialTestRequest;
}
