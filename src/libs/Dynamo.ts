/* eslint-disable import/no-extraneous-dependencies */
import * as AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

export const Dynamo = {
	get: async (ID, TableName) => {
		const params = {
			TableName,
			Key: {
				ID,
			},
		};

		const data = await documentClient.get(params).promise();

		if (!data || !data.Item) {
			throw Error(
				`There was an error fetching the data for ID of ${ID} from ${TableName}`
			);
		}
		console.log(data);

		return data.Item;
	},

	query: async ({
		tableName,
		index = null,
		KeyConditionExpression,
		ExpressionAttributeValues,
	}) => {
		const params = {
			TableName: tableName,
			IndexName: index,
			KeyConditionExpression, // `${queryKey} = :hkey`,
			ExpressionAttributeValues, // { ':hkey': queryValue, },
		};
		console.log(params);
		const res = await documentClient.query(params).promise();

		return res.Items || [];
	},

	write: async (data, TableName) => {
		function Item() {
			return AWS.DynamoDB.Converter.marshall(data);
		}
		const params = {
			TableName,
			Item: Item(),
		};
		console.log(params);
		const res = await ddb.putItem(params).promise();
		console.log(res);
		if (!res) {
			throw Error(`There was an error inserting item in table ${TableName}`);
		}
		return data;
	},

	update: async ({ tableName, Key, UpdateExpression, updateValues }) => {
		const params = {
			TableName: tableName,
			Key,
			UpdateExpression,
			ExpressionAttributeValues: updateValues,
		};
		console.log(params);

		const res = await documentClient.update(params).promise();
		if (!res) {
			throw Error(`There was an error inserting item in table ${tableName}`);
		} else {
			return res;
		}
	},

	delete: async ({
		tableName,
		Key,
		DeleteExpression = null,
		ConditionValues = null,
	}) => {
		const params = {
			TableName: tableName,
			Key,
			ConditionExpression: DeleteExpression,
			ExpressionAttributeValues: ConditionValues,
		};
		console.log(params);

		return documentClient.delete(params).promise();
	},

	scan: async ({ tableName, filterExpression, expressionAttributes }) => {
		const params = {
			TableName: tableName,
			FilterExpression: filterExpression,
			ExpressionAttributeValues: expressionAttributes,
		};
		let items = [];
		let res = await documentClient.scan(params).promise();
		console.log(res);
		items = [...res.Items, ...items];
		// eslint-disable-next-line functional/no-loop-statement
		while (res.LastEvaluatedKey) {
			const ExclusiveStartKey = res.LastEvaluatedKey;
			// eslint-disable-next-line no-await-in-loop
			res = await documentClient
				.scan({ ...params, ExclusiveStartKey })
				.promise();
			items = [...res.Items, ...items];
			console.log(res);
		}
		console.log(items);

		return items || [];
	},
	getAll: async ({ tableName }) => {
		const params = {
			TableName: tableName,
		};
		const res = await documentClient.scan(params).promise();

		return res.Items || [];
	},
	marshall: (object) => {
		// Object.keys(object).forEach((key) => {
		//   if (object[key] == '') {
		//     object[key] = null;
		//   }
		// });
		return AWS.DynamoDB.Converter.marshall(object);
	},
	unmarshall: (value) => AWS.DynamoDB.Converter.unmarshall(value),
};
