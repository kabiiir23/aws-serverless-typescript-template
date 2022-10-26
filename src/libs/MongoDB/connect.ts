import { connect } from 'mongoose';

export const dbURI = process.env.MONGO_DB_URI;

export const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	autoIndex: false, // Don't build indexes
	poolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	// family: '4', // Use IPv4, skip trying IPv6
};

let conn = null;
export const connectToMongo = async () => {
	console.log('connecting mongo');

	if (conn === null) {
		conn = await connect(dbURI, dbOptions);
		console.log('connected to mongo');
	} else {
		return conn;
	}
};
