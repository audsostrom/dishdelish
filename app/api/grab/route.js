import {auth} from '../../auth';
import {getUserIngredients} from '@/app/db';

/**
 * Retrieves user's ingredients based on the user's email after
 * authenticating the session.
 * @param {*} req - contains information about the incoming
 * HTTP request, such as headers, parameters, and body data.
 * @return {Object} - a JSON response with an object
 * containing  the ingredients fetched for the user based on
 * their email.
 */
export async function GET(req) {
	const session = await auth();
	let response = [];
	if (session?.user?.email) {
		response = await getUserIngredients(session?.user?.email);
	}
	return Response.json({ingredients: response});
}
