import 'source-map-support/register';

import {
	BodyParsedAPIGatewayProxyEvent,
	BodyParsedEventAPIGatewayProxyEvent,
	Responses,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const hello: BodyParsedEventAPIGatewayProxyEvent = async (
	event: BodyParsedAPIGatewayProxyEvent,
	context
) => {
	context.callbackWaitsForEmptyEventLoop = false;

	const { name } = event.pathParameters;

	return Responses._200({
		message: `Hello ${name}`,
	});
};

export const main = middyfy(hello);
