import { Authorizers } from '@libs/apiGateway';
import { handlerPath } from '@libs/handlerResolver';
import vpc from '@libs/vpc';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'getHello/{name}',
				integration: 'lambda-proxy',
				cors: true,
				iamRoleStatements: [],
				authorizer: Authorizers.userAuthorizer,
				vpc,
			},
		},
	],
};
