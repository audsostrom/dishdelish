import {NextResponse} from 'next/server';
import {auth, signOut} from '../../auth';
import {getUserIngredients} from '@/app/db';

export async function GET(req) {
	const session = await auth();
	console.log('hey');
	let response = [];
	if (session?.user?.email) {
		response = await getUserIngredients(session?.user?.email);
	}
	console.log('response', response);


	return Response.json({ingredients: response});
}
