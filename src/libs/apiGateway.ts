import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

export type ValidatedAPIGatewayProxyEvent<S> = Omit<
  APIGatewayProxyEvent,
  'body'
> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export type BodyParsedAPIGatewayProxyEvent = Omit<
  APIGatewayProxyEvent,
  'body'
> & {
  body: any;
};

export type BodyParsedEventAPIGatewayProxyEvent = Handler<
  BodyParsedAPIGatewayProxyEvent,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const Responses = {
  _DefineResponse(statusCode = 502, data = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      statusCode,
      body: JSON.stringify(data),
    };
  },

  _200(data = {}) {
    return this._DefineResponse(200, data);
  },

  _204(data = {}) {
    return this._DefineResponse(204, data);
  },

  _400(data = {}) {
    return this._DefineResponse(400, data);
  },

  _404(data = {}) {
    return this._DefineResponse(404, data);
  },
};

export const Authorizers = {
  userAuthorizer: {
    arn: 'arn:aws:cognito-idp:{{REGION}}:{{AWS_ACCOUNT_ID}}:userpool/{{COGNITO_USERPOOL}}',
  },
};
