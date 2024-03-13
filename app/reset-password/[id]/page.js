import {SubmitButton} from '../../../components/submit-button/submit-button';
import './reset-password.css';
import {redirect} from 'next/navigation';
import {resetPassword} from '@/app/db';
import {getToken} from '@/app/db';

/**
 * @return {*} – Renders the Password Resets Page
 */
export default async function ForgotPassword({params, searchParams}) {
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
	}

	return (
		<div className="forgot-password-container">
			{tokenDoc && isExpired ? (
				<div className="forgot-password-wrapper">
					<div className="forgot-password-header">Reset Your Password</div>
					<div className="forgot-password-subheader">
						Enter your new password, and you'll be
						redirected to the login page after.
					</div>
					<form
						action={async (formData) => {
							'use server';
							if (
								formData.get('password') != '' &&
                formData.get('confirm-password') != '' &&
                formData.get('password') == formData.get('confirm-password')
							) {
								await resetPassword(
									email,
									formData.get('password'),
									formData.get('confirm-password'),
								);
								redirect('/login');
							} else {
								redirect(`/reset-password/${token}/?match=false`);
							}
						}}
					>
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
