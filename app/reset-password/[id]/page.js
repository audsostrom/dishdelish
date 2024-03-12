import {SubmitButton} from '../../../components/submit-button/submit-button';
import './reset-password.css';
import {redirect} from 'next/navigation';
import {resetPassword} from '@/app/db';
import {getToken} from '@/app/db';

/**
 * @return {*} – Renders the Password Resets Page
 */
export default async function ForgotPassword({params, searchParams}) {
	console.log(params, searchParams);
	const token = params['id'];
	const match = searchParams['match'];
	const tokenDoc = await getToken(token);
	let email;
	let expirationDate;
	let isExpired;
	if (tokenDoc) {
		email = tokenDoc['email'];
		expirationDate = tokenDoc['expireAt'];
		isExpired = Date.now() < expirationDate;
		console.log('tokenDoc', tokenDoc, token, typeof token);
	}

	return (
		<div className="forgot-password-container">
			{tokenDoc && isExpired ? (
				<div className="forgot-password-wrapper">
					<div className="forgot-password-header">Reset Your Password</div>
					<form
						action={async (formData) => {
							'use server';
							if (
								formData.get('password') != '' &&
                formData.get('confirm-password') != '' &&
                formData.get('password') == formData.get('confirm-password')
							) {
								const response = await resetPassword(
									email,
									formData.get('password'),
									formData.get('confirm-password'),
								);
								console.log('response was', response);
								redirect('/login');
							} else {
								redirect(`/reset-password/${token}/?match=false`);
							}
						}}
					>
						<div>
              Enter your new password, and you'll be redirected to the login
              page after.
						</div>
						<div className="password-input-wrapper">
							<label htmlFor="password">Password</label>
							<input
								id="password"
								name="password"
								type="password"
								placeholder="Enter password"
								required
								className="input-box"
							/>
							<input
								id="confirm-password"
								name="confirm-password"
								type="password"
								placeholder="Confirm password"
								required
								className="input-box"
							/>
						</div>
						<div className="sign-in-button">
							<SubmitButton>Go Back To Login</SubmitButton>
						</div>
						{match && <div>Passwords must match</div>}
					</form>
				</div>
			) : (
				<div className="forgot-password-wrapper">
					<div className="forgot-password-header">Reset Your Password</div>
					<div>Link is expired</div>
				</div>
			)}
		</div>
	);
}
