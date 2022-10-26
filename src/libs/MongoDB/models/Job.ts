import { model, Schema } from 'mongoose';

type Job = {
	status: 'success' | 'pending' | 'failed';
	url?: string;
};

const jobSchema = new Schema<Job>(
	{
		status: {
			type: String,
			enum: ['success', 'pending', 'failed'],
			default: 'pending',
			required: true,
		},
		url: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const Job = model<Job>('Jobs', jobSchema);
