import 'source-map-support/register';

import {
	Responses,
	ValidatedAPIGatewayProxyEvent,
	ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
	event: ValidatedAPIGatewayProxyEvent<typeof schema>,
	context
) => {
	context.callbackWaitsForEmptyEventLoop = false;

	const { name } = event.body;

	return Responses._200({
		message: `Hello ${name}`,
	});
};

export const main = middyfy(hello);
