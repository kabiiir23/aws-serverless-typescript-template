import type { AWS } from '@serverless/typescript';

import { ServiceApi } from './src/functions';

const serverlessConfiguration: AWS = {
	service: 'SERVICE_NAME',

	frameworkVersion: '2',

	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		timeout: 60,
		profile: 'PROFILE',
		stage: 'STAGE',
		region: 'us-east-1',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			MONGO_DB_URI: '',
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: ['dynamodb:*', 's3:*', 'ses:*'],
						Resource: '*',
					},
				],
			},
		},

		lambdaHashingVersion: '20201221',
	},
	custom: {
		webpack: {
			webpackConfig: './webpack.config.js',
			includeModules: true,
		},
		customDomain: {
			domainName: 'DOMAIN_NAME',
			basePath: 'admin-api',
			stage: '${self:provider.stage}',
			endpointType: 'edge',
			certificateName: 'CERTIFICATE_NAME',
			apiType: 'rest',
			securityPolicy: 'tls_1_2',
			createRoute53Record: true,
		},
	},

	plugins: ['serverless-webpack', 'serverless-domain-manager'],

	// import the function via paths
	functions: { ...ServiceApi },
};

module.exports = serverlessConfiguration;
