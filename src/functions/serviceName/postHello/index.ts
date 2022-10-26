import { Authorizers } from '@libs/apiGateway';
import { handlerPath } from '@libs/handlerResolver';
import vpc from '@libs/vpc';

import schema from './schema';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'post',
				path: 'hello',
				integration: 'lambda-proxy',
				cors: true,
				authorizer: Authorizers.userAuthorizer,
				vpc,
				request: {
					schemas: {
						'application/json': schema,
					},
				},
			},
		},
	],
};
