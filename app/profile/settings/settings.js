
import './settings.css';
import Link from 'next/link';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { getSavedRecipes } from '../../db';
import LogoutIcon from '@mui/icons-material/Logout';
import { sendEmail } from '@/app/mail';
import { auth, signOut } from '../../auth';
import { getUser } from '../../db';

export async function Settings() {
	let session = await auth();
	console.log(session.user);
	let user = await getUser(session.user.email);

	// let userRecipes = await getSavedRecipes(session.user.email);
	// console.log('my recipes', userRecipes);
	let userRecipes = await getSavedRecipes(session.user.email);
	console.log(userRecipes)
	return (
		<div className='settings-container'>
			<div className='top-settings-row'>
				<div className='subtitle'>Settings</div>
				<form className='sign-out'
					action={async () => {
						'use server';
						await signOut();
					}}
				>
					<button className='sign-out-button' type="submit">
						<div>Sign Out</div>
						<LogoutIcon/>
					</button>
				</form>

			</div>
			<form className='settings'
				action={async (formData) => {
					'use server';
					console.log('values', formData.get('password'), formData.get('email'))
				}}
			>
				<div className='email'>
					<div className='profile-label'>email</div>
					<TextField name='email' type='email' placeholder={user.email} className='field-wrapper'/>
				</div>
				<div className='password'>
					<div className='profile-label'>change password</div>
					<TextField name='password' type='password' style={{marginRight: '2vw'}} className="password-field" label="enter new password"/>
					<TextField className='password-field' label='confirm password' type="password" />
				</div>
				<button type='submit' className='confirm-changes-button'>Confirm Changes</button>
			</form>
			<div className='subtitle'>Saved Recipes</div>
			<div className='savedRecipes'>
				{
					userRecipes.map((item, i) => 
					// this redirects you to specific recipe route with id and favorites in the search params
						<Link 
							key={'recipe' + i}
							href={{
								pathname: `/recipe/`,
								query: { id: item['recipeId'], favorited: userRecipes.some(obj => obj.id === item['id']) },
							}}
						>
							<div className='recipe-card' key={i}>
								<Image alt='recipe photo' className='card-image' width='200' height='200' src={item['image']}/>
								<div className='card-text'>
									<div className='recipe-title'>{item['title']}</div>
									<div className='time'>Time: {item['readyInMinutes']} minutes</div>
								</div>
							</div>
						</Link>
					)
				}
			</div>
		</div>

	);
}

