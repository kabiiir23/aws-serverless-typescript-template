/* eslint-disable import/no-extraneous-dependencies */
import * as AWS from 'aws-sdk';

const SES = new AWS.SES();

export const SendEmail = async ({ To, Html, Subject }) => {
	const params = {
		Destination: {
			ToAddresses: [To],
		},
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: Html,
				},
			},
			Subject: { Data: Subject },
		},
		Source: '<Source Email>',
	};

	return SES.sendEmail(params).promise();
};
