import Link from 'next/link';
import {sendEmail} from '../mail';
import {SubmitButton} from '../../components/submit-button/submit-button';
import './forgot-password.css';
import {redirect} from 'next/navigation';

/**
 * @return {*} – Renders the Forgot Password page
 */
export default function ForgotPassword() {
	return (
		<div className="forgot-password-container">
			<div className="forgot-password-wrapper">
				<div className='forgot-password-header'>
          Forgot Password?

					<div className="forgot-password-subheader">
						{'Remembered your password? '}
						<Link href="/login">
                Go Back To Login
						</Link>
					</div>

				</div>
				<form
					action={async (formData) => {
						'use server';
						await sendEmail(formData.get('email'));
						redirect('/login');
					}}
				>
					<div className='more-info'>
						A password reset link for your account if it's verified.
						<br></br> 
						You'll be redirected to the login page after.
					</div>
					<div className="email-input-wrapper">
						<label
							htmlFor="email"
						>
          Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Enter email address"
							autoComplete="email"
							required
							className="input-box"
						/>
					</div>
					<div className="sign-in-button">
						<SubmitButton>Send Recovery Email</SubmitButton>
					</div>
				</form>
			</div>
		</div>
	);
}
