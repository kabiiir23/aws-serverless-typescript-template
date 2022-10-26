import jwtDecode from 'jwt-decode';
import moment from 'moment';

export const checkAuth = (event) => {
	console.log(event.headers.Authorization);
	if (event.headers.Authorization) {
		const token = event.headers.Authorization;
		const decoded: any = jwtDecode(token);
		if (moment().isSameOrBefore(moment.unix(decoded.exp))) {
			return {
				valid: true,
				userId: decoded.sub,
				...decoded,
			};
		}
		return {
			error: 'Invalid origin:ACCESS RESTRICTED',
			message: 'Unauthorized',
		};
	}
	else {
		return {
			error: 'Invalid origin:ACCESS RESTRICTED',
			message: 'UnAuthorized Origin',
		};
	}
};
